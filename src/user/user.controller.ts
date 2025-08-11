import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('addUser')
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
