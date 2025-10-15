import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { ContentModule } from '../content/content.module';

@Module({
  imports: [ContentModule],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule {}
