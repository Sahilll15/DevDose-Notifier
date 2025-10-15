import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty({ description: 'User full name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User type (optional)',
    example: 'developer',
    required: false,
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({
    description: 'Admin code for admin operations',
    example: 'ADMIN123',
    required: false,
  })
  @IsString()
  @IsOptional()
  adminCode?: string;

  @ApiProperty({
    description: 'Whether user is admin',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}
