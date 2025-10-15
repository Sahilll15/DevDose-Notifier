import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TopicsService } from 'src/topics/topics.service';
import { RegisterService } from 'src/register/register.service';
import { EmailService } from 'src/email/email.service';
import { LEARNING_PROMPT } from 'src/constants/prompt';

@Injectable()
export class NotifyService {
  private readonly logger = new Logger(NotifyService.name);

  constructor(
    private readonly topicService: TopicsService,
    private readonly userService: RegisterService,
    private readonly emailService: EmailService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async createNotification() {
    try {
      this.logger.log('Starting daily notification process...');
      const topic = await this.topicService.generateContent();
      if (!topic) {
        this.logger.error('Failed to generate learning topic');
        return;
      }

      const users = await this.userService.findAll();

      if (!users || users.length === 0) {
        this.logger.warn('No users found to notify');
        return;
      }

      const emailPromises = users.map(async (user) => {
        const success = await this.emailService.sendEmail(
          user.email,
          '📚 Your Daily Learning Topic',
          topic,
        );

        if (success) {
          this.logger.log(`Notification sent to ${user.email}`);
        } else {
          this.logger.error(`Failed to send notification to ${user.email}`);
        }

        return success;
      });

      const results = await Promise.allSettled(emailPromises);
      const successCount = results.filter(
        (result) => result.status === 'fulfilled' && result.value === true,
      ).length;

      this.logger.log(
        `Daily notifications completed. ${successCount}/${users.length} emails sent successfully.`,
      );
    } catch (error) {
      this.logger.error('Error in daily notification process', error);
    }
  }

  async sendTestNotification(email: string): Promise<boolean> {
    try {
      const topic = 'This is a test topic';

      if (!topic) {
        this.logger.error('Failed to generate test topic');
        return false;
      }

      return await this.emailService.sendEmail(
        email,
        '🧪 Test Learning Topic',
        topic,
      );
    } catch (error) {
      this.logger.error('Error sending test notification', error);
      return false;
    }
  }
}
