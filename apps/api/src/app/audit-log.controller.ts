import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../entities/audit-log.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../auth/user-role.enum';

@Controller('audit-log')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditLogController {
  constructor(@InjectRepository(AuditLog) private repo: Repository<AuditLog>) {}

  @Get()
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  async getAllLogs() {
    return this.repo.find({ order: { timestamp: 'DESC' } });
  }
}
