import { Perms } from './permissions.enum';

export const permissionsArray = Object.keys(Perms);
export const permissionsDefault = [
  Perms.CREATE,
  Perms.FIND,
  Perms.FIND_ONE,
  Perms.UPDATE,
  Perms.DELETE,
];
