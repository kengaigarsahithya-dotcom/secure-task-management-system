import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../auth/user-role.enum';

// Decorator that marks which roles are allowed to access an endpoint
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
