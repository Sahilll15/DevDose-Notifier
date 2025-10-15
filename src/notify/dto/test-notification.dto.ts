import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class TestNotificationDto {
  @ApiProperty({
    description: 'Email address to send test notification to',
    example: 'test@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
