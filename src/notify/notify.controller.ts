import { Controller, Post, Body, Get } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { TestNotificationDto } from './dto/test-notification.dto';

@ApiTags('notifications')
@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Post('test')
  @ApiOperation({
    summary: 'Send test notification to email',
    description:
      'Send a test learning topic notification to the specified email address',
  })
  @ApiBody({
    type: TestNotificationDto,
    description: 'Email address for test notification',
  })
  @ApiResponse({
    status: 200,
    description: 'Test notification sent successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to send test notification',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
  })
  async sendTestNotification(@Body() body: TestNotificationDto) {
    const success = await this.notifyService.sendTestNotification(body.email);
    return {
      success,
      message: success
        ? 'Test notification sent successfully'
        : 'Failed to send test notification',
    };
  }

  @Post('trigger')
  @ApiOperation({
    summary: 'Manually trigger daily notifications',
    description:
      'Manually trigger the daily notification process for all registered users',
  })
  @ApiResponse({
    status: 200,
    description: 'Daily notifications triggered successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
  })
  async triggerDailyNotifications() {
    await this.notifyService.createNotification();
    return {
      success: true,
      message: 'Daily notifications triggered successfully',
    };
  }
}
