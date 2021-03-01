import { SetMetadata } from '@nestjs/common';
export const Perms = (...perms: string[]) => SetMetadata('permissions', perms);
