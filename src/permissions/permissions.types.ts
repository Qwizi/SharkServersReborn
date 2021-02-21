import {CreatePermissionDto} from "./dto/createPermission.dto";

import {Perms} from "./permissions.enum";
export interface PermissionModuleOption {
    module: string;
    permissions: Perms[]
}
export interface PermissionModuleOptions {
    modules: PermissionModuleOption[]
}