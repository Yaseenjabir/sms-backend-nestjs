import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exam, ExamDocument } from './schema/exam.schema';
import { CreateExamDto } from './dto/createExam.dto';

@Injectable()
export class ExamService {
  constructor(@InjectModel(Exam.name) private examModel: Model<ExamDocument>) {}

  async createExam(createExamDto: CreateExamDto): Promise<Exam> {
    const exam = new this.examModel(createExamDto);
    const ans = await exam.save();
    return ans;
  }

  async findAll(): Promise<Exam[]> {
    return this.examModel.find().exec();
  }
}
