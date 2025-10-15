import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() res: Response) {
    return res.sendFile('index.html', { root: 'views' });
  }

  @Get('docs')
  apiDocs(@Res() res: Response) {
    return res.sendFile('api-docs.html', { root: 'views' });
  }

  @Get('app/health')
  getHealth() {
    return this.appService.getHealth();
  }
}
