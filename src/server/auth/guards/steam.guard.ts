import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";

@Injectable()
export class SteamGuard implements CanActivate {
	// @ts-ignore
	async canActivate(context: ExecutionContext): Promise<boolean | Promise<boolean>> {
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		return !(!user || !user.steam_profile);
	}
}