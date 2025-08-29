import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateTeacherDto } from './dto/createTeacher.dto';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('create')
  async createTeacher(@Body() body: CreateTeacherDto) {
    return await this.teacherService.createTeacher(body);
  }

  @Get('getAllTeachers')
  async getAllTeachers() {
    return await this.teacherService.getAllTeachers();
  }
}
