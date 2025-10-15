import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { SwaggerAuthService } from './swagger-auth.service';
import { SwaggerAuthController } from './swagger-auth.controller';
import { SwaggerAuthMiddleware } from './swagger-auth.middleware';

@Module({
  providers: [AdminAuthService, SwaggerAuthService, SwaggerAuthMiddleware],
  controllers: [SwaggerAuthController],
  exports: [AdminAuthService, SwaggerAuthService],
})
export class AdminAuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SwaggerAuthMiddleware).forRoutes('api');
  }
}
