import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entity/users.entity";
import {RegisterUserDto} from "../dto/registerUser.dto";
import * as bcrypt from 'bcrypt';
import {RolesService} from "../../roles/roles.service";
import {ChangePasswordDto} from "../dto/changePassword.dto";
import {ChangeUsernameDto} from "../dto/changeUsername.dto";
import {Request} from "express";
import {SendChangeEmailEmailDto} from "../dto/sendChangeEmailEmail.dto";
import {Operations} from "../../authenticator/operations.enums";
import {AuthenticatorService} from "../../authenticator/authenticator.service";
import {MailService} from "../../mail/mail.service";
import {ChangeEmailDto} from "../dto/changeEmail.dto";

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
	private logger = new Logger(UsersService.name);

	constructor(
		@InjectRepository(User) repo,
		private rolesService: RolesService,
		private authenticatorService: AuthenticatorService,
		private mailService: MailService,
	) {
		super(repo);
	}

	async activate(user: User) {
		return this.repo.update(user.id, {is_active: true});
	}

	async deactivate(user: User) {
		return this.repo.update(user.id, {is_active: false});
	}

	async createHashedPassword(password: string) {
		return bcrypt.hash(password, 10);
	}

	async register(registerUserDto: RegisterUserDto, isActive?: boolean, isAdmin?: boolean): Promise<User> {
		const {username, password, email} = registerUserDto;
		const userExist = await this.findOne({
			where: [
				{username: registerUserDto.username},
				{email: registerUserDto.email}
			]
		})
		if (userExist) throw new BadRequestException('User exists');

		const passwordHashed = await this.createHashedPassword(password);
		const userRole = await this.rolesService.findOne({where: {name: 'Uzytkowni'}});
		const adminRole = await this.rolesService.findOne({where: {name: 'Admin'}})
		const user = await this.repo.create({
			username: username,
			display_name: username,
			password: passwordHashed,
			email: email,
			roles: [userRole]
		})
		if (isActive) user.is_active = true;
		if (isAdmin) {
			user.is_admin = true
			user.roles = [...user.roles, adminRole]
		}
		await this.repo.save(user);
		return user
	}

	async comparePassword(password: string, hashedPassword: string,) {
		return !!bcrypt.compare(password, hashedPassword);
	}

	async changePassword(currentUser: User, changePasswordDto: ChangePasswordDto) {
		const user = await this.repo.findOne({where: {id: currentUser.id}})
		const {old_password, new_password, new_password_confirm} = changePasswordDto;
		const badOldPassword = !await bcrypt.compare(old_password, user.password);
		const newPasswordNotEqual = new_password !== new_password_confirm;
		if (badOldPassword) throw new BadRequestException("Bad old password")
		if (newPasswordNotEqual) throw new BadRequestException("New password and new password equal not equal")
		user.password = await this.createHashedPassword(new_password)
		await this.repo.save(user);
		return user;
	}

	async changeUsername(user: User, changeUsernameDto: ChangeUsernameDto) {
		const {username} = changeUsernameDto;
		const usernameExists = await this.repo.findOne({where: {display_name: username}})
		if (usernameExists) throw new BadRequestException('This username is already taken')
		user.display_name = username
		await this.repo.save(user);
		return user;
	}

	async sendChangeEmail(userId: number, req: Request, changeEmailDto: SendChangeEmailEmailDto) {
		const user = await this.repo.findOne({where: {id: userId}, relations: ['operations']})
		const {email} = changeEmailDto;
		const emailIsTaken = await this.repo.findOne({where: {email: email}})
		if (emailIsTaken) throw new BadRequestException('Email is taken')
		await this.authenticatorService.deactivateConfirmCodes(user, Operations.CONFIRM_CHANGE_EMAIL);
		const [code, encryptedCode] = await this.authenticatorService.createCode(user, Operations.CONFIRM_CHANGE_EMAIL);
		const url = await this.mailService.getChangeEmailUrl(req, encryptedCode, email);
		const job = await this.mailService.sendChangeEmail(user, code, url);
		return {
			user: user,
			job: job
		}
	}

	async changeEmail(user: User, dto: ChangeEmailDto) {
		const {encrypted_code, email} = dto;
		const decryptedCode = await this.authenticatorService.decryptCode(encrypted_code);
		if (!decryptedCode) throw new BadRequestException("Bad encrypted code");
		const [isValidCode, operation] = await this.authenticatorService.checkCode(decryptedCode, true, Operations.CONFIRM_CHANGE_EMAIL)
		if (!isValidCode) throw new BadRequestException('Not validated code')
		user.email = email
		await this.repo.save(user)
		return user;
	}
}
