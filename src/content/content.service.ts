import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Content } from './schemas/content.schema';
import { Model } from 'mongoose';

@Injectable()
export class ContentService {
  private readonly logger = new Logger(ContentService.name);

  constructor(
    @InjectModel(Content.name) private contentModel: Model<Content>,
  ) {}

  async saveContent(
    title: string,
    content: string,
    topicArea: string,
  ): Promise<Content> {
    try {
      const newContent = new this.contentModel({
        title,
        content,
        topicArea,
        generatedAt: new Date(),
        isUsed: false,
      });

      const savedContent = await newContent.save();
      this.logger.log(`Content saved: ${title}`);
      return savedContent;
    } catch (error) {
      this.logger.error('Error saving content:', error);
      throw error;
    }
  }

  async getRecentContent(limit: number = 5): Promise<Content[]> {
    try {
      const recentContent = await this.contentModel
        .find({ isUsed: true })
        .sort({ generatedAt: -1 })
        .limit(limit)
        .lean();

      return recentContent;
    } catch (error) {
      this.logger.error('Error fetching recent content:', error);
      return [];
    }
  }

  async markContentAsUsed(contentId: string): Promise<void> {
    try {
      await this.contentModel.findByIdAndUpdate(contentId, { isUsed: true });
      this.logger.log(`Content marked as used: ${contentId}`);
    } catch (error) {
      this.logger.error('Error marking content as used:', error);
    }
  }

  async getContentByTopicArea(
    topicArea: string,
    limit: number = 3,
  ): Promise<Content[]> {
    try {
      const content = await this.contentModel
        .find({ topicArea, isUsed: true })
        .sort({ generatedAt: -1 })
        .limit(limit)
        .lean();

      return content;
    } catch (error) {
      this.logger.error('Error fetching content by topic area:', error);
      return [];
    }
  }
}
