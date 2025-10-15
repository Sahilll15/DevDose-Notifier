import {
  Controller,
  Get,
  Query,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { SwaggerAuthService } from './swagger-auth.service';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiTags('swagger-auth')
@Controller('swagger-auth')
export class SwaggerAuthController {
  constructor(private readonly swaggerAuthService: SwaggerAuthService) {}

  @Get('verify')
  @ApiOperation({ summary: 'Verify admin code for Swagger access' })
  @ApiQuery({ name: 'code', description: 'Admin access code', required: true })
  @ApiResponse({ status: 200, description: 'Access granted' })
  @ApiResponse({ status: 401, description: 'Invalid access code' })
  verifyAccess(@Query('code') code: string, @Res() res: Response) {
    try {
      this.swaggerAuthService.validateSwaggerAccess(code);

      res.cookie('swagger-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'strict',
      });

      res.redirect('/api');
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        res.status(401).json({
          message: 'Invalid access code',
          error: 'Unauthorized',
        });
      } else {
        res.status(500).json({
          message: 'Internal server error',
          error: 'Internal Server Error',
        });
      }
    }
  }
}
