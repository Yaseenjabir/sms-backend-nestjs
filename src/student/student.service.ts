import { ConflictException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/createStudent.dto';
import { Student } from './schema/student.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async create(dto: CreateStudentDto): Promise<Student> {
    console.log(dto);
    const existing = await this.studentModel.findOne({
      grade: dto.grade,
      section: dto.section,
      rollNo: dto.rollNo,
    });

    if (existing) {
      throw new ConflictException(
        `A student with roll number ${dto.rollNo} already exists in Grade ${dto.grade} Section ${dto.section}`,
      );
    }

    // Create new student
    const student = new this.studentModel(dto);
    return student.save();
  }
}
