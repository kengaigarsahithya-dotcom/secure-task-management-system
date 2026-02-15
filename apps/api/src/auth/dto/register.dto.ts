import { UserRole } from '../../auth/user-role.enum';

export class RegisterDto {
  email!: string;
  password!: string;
  role?: UserRole;
}