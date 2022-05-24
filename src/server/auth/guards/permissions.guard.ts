import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Permission} from "../../permissions/permissions.entity";
import {Role} from "../../roles/roles.entity";
import {RolesService} from "../../roles/services/roles.service";

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly rolesService: RolesService
    ) {}

    async matchPermissions(permissions: string[], roles: Role[]) {
        let hasArray = [];
        for await (const role of roles) {
            let has = await this.rolesService.hasPerms(role, permissions);
            hasArray.push(has);
        }
        console.log(hasArray);
        return !!hasArray.find(e => e === true)
    }

    // @ts-ignore
    async canActivate(context: ExecutionContext): Promise<boolean | Promise<boolean>> {
        const permissions = this.reflector.get<string[]>('permissions', context.getHandler())
        if (!permissions) return true;
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user || !user.roles) return false;
        const has = await this.matchPermissions(permissions, user.roles);
        console.log(has);
        return has
    }
}