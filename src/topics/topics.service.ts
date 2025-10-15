import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ContentService } from '../content/content.service';
import { LEARNING_PROMPT } from '../constants/prompt';

@Injectable()
export class TopicsService {
  private readonly genAI: GoogleGenerativeAI;

  private readonly logger = new Logger(TopicsService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly contentService: ContentService,
  ) {
    this.genAI = new GoogleGenerativeAI(
      this.configService.get<string>('GEMINI_API_KEY') as string,
    );
  }

  async generateContent(prompt?: string): Promise<string> {
    try {
      this.logger.log('Generating learning topic');

      const recentContent = await this.contentService.getRecentContent(5);
      const previousTitles = recentContent.map((content) => content.title);

      const enhancedPrompt = LEARNING_PROMPT(previousTitles);

      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
      });
      const result = await model.generateContent(enhancedPrompt);
      const response = await result.response;
      const generatedContent = response.text();

      const topicArea = this.extractTopicArea(generatedContent);
      const title = this.extractTitle(generatedContent);

      await this.contentService.saveContent(title, generatedContent, topicArea);

      return generatedContent;
    } catch (error) {
      this.logger.error('Error generating topic:', error.message);
      throw error;
    }
  }

  private extractTopicArea(content: string): string {
    const topicAreaMatch = content.match(/\*\*Topic Area:\*\*\s*\[([^\]]+)\]/);
    return topicAreaMatch ? topicAreaMatch[1].trim() : 'General';
  }

  private extractTitle(content: string): string {
    const titleMatch = content.match(/\*\*Title:\*\*\s*\[([^\]]+)\]/);
    return titleMatch ? titleMatch[1].trim() : 'Daily Learning Topic';
  }
}
