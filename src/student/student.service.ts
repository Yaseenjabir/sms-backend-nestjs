import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/createStudent.dto';
import { Student } from './schema/student.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async create(dto: CreateStudentDto): Promise<Student> {
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

    // Cast class id to ObjectId
    const student = new this.studentModel({
      ...dto,
      class: new Types.ObjectId(dto.class),
    });

    return student.save();
  }

  async getAllStudents() {
    const students = await this.studentModel.find();

    if (students.length < 1) {
      throw new NotFoundException('No students found');
    }

    return students;
  }
}
