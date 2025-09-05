import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/createStudent.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  async create(@Body() body: CreateStudentDto) {
    return await this.studentService.create(body);
  }

  @Get('getAllStudents')
  async getAllStudents() {
    return await this.studentService.getAllStudents();
  }
}
