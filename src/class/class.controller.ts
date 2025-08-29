import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/createClass.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post('create')
  async addClass(@Body() body: CreateClassDto) {
    const data = await this.classService.createClass(body);

    return {
      data,
      message: 'Class created successfully',
    };
  }

  @Get('getAll')
  async getAll() {
    const data = await this.classService.getAllClasses();

    return data;
  }
}
