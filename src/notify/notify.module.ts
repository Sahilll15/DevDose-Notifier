import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import { TopicsModule } from 'src/topics/topics.module';
import { RegisterModule } from 'src/register/register.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [TopicsModule, RegisterModule, EmailModule],
  providers: [NotifyService],
  controllers: [NotifyController],
})
export class NotifyModule {}
