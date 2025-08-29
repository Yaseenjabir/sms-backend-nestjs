import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class, ClassDocument } from './schema/class.schema';
import { Model } from 'mongoose';
import { CreateClassDto } from './dto/createClass.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private readonly classModel: Model<ClassDocument>,
  ) {}

  async createClass(data: CreateClassDto) {
    // Check if the combination already exists
    const existingClass = await this.classModel.findOne({
      grade: data.grade,
      section: data.section,
    });

    if (existingClass) {
      throw new ConflictException(
        `Class for Grade ${data.grade}, Section ${data.section} already exists`,
      );
    }

    // Check if the room is already in use
    const roomConflict = await this.classModel.findOne({
      room: data.room,
    });

    if (roomConflict) {
      throw new ConflictException(`Room ${data.room} is already assigned`);
    }

    // (Optional) Check if the teacher is already assigned
    const teacherConflict = await this.classModel.findOne({
      teacher: data.teacher,
    });

    if (teacherConflict) {
      throw new ConflictException(
        `Teacher ${data.teacher} is already assigned to another class`,
      );
    }

    // Create the class
    return await new this.classModel(data).save();
  }

  async getAllClasses() {
    let data = await this.classModel.find();

    return {
      data,
      message: data.length ? undefined : 'No classes available',
    };
  }
}
