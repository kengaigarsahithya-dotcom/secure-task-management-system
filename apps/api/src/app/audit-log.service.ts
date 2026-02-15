import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../entities/audit-log.entity';

@Injectable()
export class AuditLogService {
  constructor(@InjectRepository(AuditLog) private repo: Repository<AuditLog>) {}

  async record(action: string, entityType: string, entityId: string, performedBy: string) {
    const log = this.repo.create({ action, entityType, entityId, performedBy });
    await this.repo.save(log);
  }
}
