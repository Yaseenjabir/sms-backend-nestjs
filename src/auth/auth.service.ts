import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).lean();
  }

  async validateUser(body: LoginDto) {
    const { email, password } = body;
    const user = await this.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      console.log(result);

      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async signup(body: SignupDto): Promise<{ success: boolean }> {
    try {
      const hashedPassword = await bcrypt.hash(body.password, 10);

      const createdUser = new this.userModel({
        name: body.name,
        email: body.email,
        password: hashedPassword,
      });

      await createdUser.save();

      return {
        success: true,
      };
    } catch (error) {
      console.log('Error is : ', error);
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async login(user: LoginDto, res: Response) {
    const validatedUser: any = await this.validateUser(user);

    const payload = {
      _id: validatedUser._id,
      name: validatedUser.name,
      email: validatedUser.email,
      role: validatedUser.role,
    };

    const access_token = this.jwtService.sign(payload);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).json({ message: 'Login successful' });
  }
}
