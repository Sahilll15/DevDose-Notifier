import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDTO } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { AdminAuthService } from '../auth/admin-auth.service';

@Injectable()
export class RegisterService {
  private readonly logger = new Logger(RegisterService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly adminAuthService: AdminAuthService,
  ) {}

  async register(
    registerDTO: RegisterDTO,
  ): Promise<{ message: string; user: any }> {
    try {
      const { name, email, type, adminCode, isAdmin } = registerDTO;

      if (!email || !email.includes('@')) {
        throw new BadRequestException('Valid email address is required');
      }

      if (!name || name.trim().length === 0) {
        throw new BadRequestException('Name is required');
      }

      if (isAdmin && !adminCode) {
        throw new BadRequestException(
          'Admin code is required for admin registration',
        );
      }

      if (isAdmin && adminCode) {
        this.adminAuthService.validateAdminCode(adminCode);
      }

      this.logger.log(`Attempting to register user: ${email}`);

      const existingUser = await this.findByEmail(email);
      if (existingUser) {
        this.logger.warn(`Registration failed - user already exists: ${email}`);
        throw new BadRequestException('User with this email already exists');
      }

      const newUser = new this.userModel({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        type: type?.trim() || 'developer',
        isAdmin: isAdmin || false,
      });

      const savedUser = await newUser.save();

      this.logger.log(`User registered successfully: ${email}`);

      return {
        message: 'Registration completed successfully',
        user: {
          _id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          isAdmin: savedUser.isAdmin,
        },
      };
    } catch (error) {
      this.logger.error(`Registration failed for ${registerDTO.email}:`, error);
      if (
        error instanceof BadRequestException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      throw new BadRequestException('Registration failed. Please try again.');
    }
  }

  async findAll(adminCode?: string): Promise<User[]> {
    try {
      if (adminCode) {
        this.adminAuthService.validateAdminCode(adminCode);
      }

      this.logger.log('Fetching all users...');
      const users = await this.userModel.find().select('-__v').lean();
      this.logger.log(`Found ${users.length} users`);
      return users;
    } catch (error) {
      this.logger.error('Error fetching users:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch users');
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      if (!id || id.trim().length === 0) {
        throw new BadRequestException('Valid user ID is required');
      }

      this.logger.log(`Fetching user with ID: ${id}`);
      const user = await this.userModel.findById(id).select('-__v').lean();

      if (!user) {
        this.logger.warn(`User not found with ID: ${id}`);
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      this.logger.error(`Error fetching user ${id}:`, error);
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch user');
    }
  }

  async update(id: string, registerDTO: RegisterDTO): Promise<User> {
    try {
      if (!id || id.trim().length === 0) {
        throw new BadRequestException('Valid user ID is required');
      }

      const { name, email, type, adminCode, isAdmin } = registerDTO;

      if (adminCode) {
        this.adminAuthService.validateAdminCode(adminCode);
      }

      if (email && !email.includes('@')) {
        throw new BadRequestException('Valid email address is required');
      }

      if (name && name.trim().length === 0) {
        throw new BadRequestException('Name cannot be empty');
      }

      this.logger.log(`Updating user with ID: ${id}`);

      const updateData: any = {};
      if (name) updateData.name = name.trim();
      if (email) updateData.email = email.toLowerCase().trim();
      if (type) updateData.type = type.trim();
      if (isAdmin !== undefined) updateData.isAdmin = isAdmin;

      const user = await this.userModel
        .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
        .select('-__v')
        .lean();

      if (!user) {
        this.logger.warn(`User not found for update with ID: ${id}`);
        throw new NotFoundException('User not found');
      }

      this.logger.log(`User updated successfully: ${id}`);
      return user;
    } catch (error) {
      this.logger.error(`Error updating user ${id}:`, error);
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to update user');
    }
  }

  async delete(id: string, adminCode?: string): Promise<{ message: string }> {
    try {
      if (!id || id.trim().length === 0) {
        throw new BadRequestException('Valid user ID is required');
      }

      if (adminCode) {
        this.adminAuthService.validateAdminCode(adminCode);
      }

      this.logger.log(`Deleting user with ID: ${id}`);
      const user = await this.userModel.findByIdAndDelete(id);

      if (!user) {
        this.logger.warn(`User not found for deletion with ID: ${id}`);
        throw new NotFoundException('User not found');
      }

      this.logger.log(`User deleted successfully: ${id}`);
      return {
        message: 'User deleted successfully',
      };
    } catch (error) {
      this.logger.error(`Error deleting user ${id}:`, error);
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to delete user');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      if (!email || !email.includes('@')) {
        return null;
      }

      const user = await this.userModel
        .findOne({
          email: email.toLowerCase().trim(),
        })
        .select('-__v')
        .lean();

      return user;
    } catch (error) {
      this.logger.error(`Error finding user by email ${email}:`, error);
      return null;
    }
  }
}
