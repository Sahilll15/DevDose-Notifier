import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SwaggerAuthService {
  private readonly logger = new Logger(SwaggerAuthService.name);
  private readonly adminCode: string;

  constructor(private readonly configService: ConfigService) {
    this.adminCode = this.configService.get<string>('ADMIN_CODE') || 'ADMIN123';
  }

  validateSwaggerAccess(code: string): boolean {
    if (!code || code !== this.adminCode) {
      this.logger.warn(
        `Unauthorized Swagger access attempt with code: ${code}`,
      );
      throw new UnauthorizedException(
        'Invalid access code for API documentation',
      );
    }
    this.logger.log('Authorized Swagger access granted');
    return true;
  }
}
