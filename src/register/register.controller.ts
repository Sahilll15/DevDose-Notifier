import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDTO } from './dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('registration')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Get()
  @ApiOperation({ summary: 'Get all registered users' })
  @ApiResponse({ status: 200, description: 'List of all users' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Admin code required',
  })
  find(@Body() body: { adminCode?: string }) {
    return this.registerService.findAll(body.adminCode);
  }

  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'User already exists' })
  register(@Body() registerDTO: RegisterDTO) {
    return this.registerService.register(registerDTO);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.registerService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(@Param('id') id: string, @Body() registerDTO: RegisterDTO) {
    return this.registerService.update(id, registerDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Admin code required',
  })
  delete(@Param('id') id: string, @Body() body: { adminCode?: string }) {
    return this.registerService.delete(id, body.adminCode);
  }
}
