import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminAuthService {
  private readonly logger = new Logger(AdminAuthService.name);
  private readonly adminCode: string;

  constructor(private readonly configService: ConfigService) {
    this.adminCode = this.configService.get<string>('ADMIN_CODE') || 'ADMIN123';
  }

  validateAdminCode(code: string): boolean {
    if (!code || code !== this.adminCode) {
      this.logger.warn(`Invalid admin code attempt: ${code}`);
      throw new UnauthorizedException('Invalid admin code');
    }
    return true;
  }
}
