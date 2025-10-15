import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      message: 'Learning Notifier API is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }
}
