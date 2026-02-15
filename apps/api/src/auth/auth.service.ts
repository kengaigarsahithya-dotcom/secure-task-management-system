import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRole } from '../auth/user-role.enum'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /**
   * Register a new user
   */
  async register(dto: RegisterDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(dto.password, salt);

    const user = this.userRepo.create({
      email: dto.email,
      passwordHash: hash, // must match entity column name
      role: dto.role ?? UserRole.VIEWER,
    });

    return this.userRepo.save(user);
  }

  /**
   * Login existing user
   */
  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'defaultsecret', {
      expiresIn: '1h',
    });

    return { access_token: token };
  }

  /**
   * Update a user by id. Accepts partial RegisterDto (email, password, role).
   */
  async update(id: string, dto: Partial<RegisterDto>): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    if (dto.password) {
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(dto.password, salt);
    }

    if (dto.email) user.email = dto.email;
    if ((dto as any).role) user.role = (dto as any).role;

    return this.userRepo.save(user);
  }

  /**
   * Remove a user by id.
   */
  async remove(id: string): Promise<void> {
    const res = await this.userRepo.delete(id);
    if (!res.affected) throw new NotFoundException('User not found');
  }
}
