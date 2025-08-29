import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/createTeacher.dto';
import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from './schema/teacher.schema';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { createTeacherUser } from 'src/common/utils/user-creator';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async createTeacher(data: CreateTeacherDto) {
    try {
      // 1. Create a user first
      const user = await createTeacherUser(
        data.personalInfo.fullName,
        data.personalInfo.email,
        'teacher',
        this.userModel,
      );

      // 2. Create teacher document with reference to user
      const teacher = new this.teacherModel({
        ...data,
        user: user._id,
      });

      const savedTeacher = await teacher.save();

      return { savedTeacher, success: true };
    } catch (ex) {
      if (ex instanceof ConflictException) {
        throw ex; // rethrow as is
      }

      throw new InternalServerErrorException(ex.message);
    }
  }

  async getAllTeachers() {
    const teachers = await this.teacherModel.find();

    if (teachers.length < 1) {
      throw new NotFoundException('No teachers found');
    }

    return teachers;
  }
}
