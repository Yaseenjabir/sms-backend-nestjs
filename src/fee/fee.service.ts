import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FeeStructure, FeeStructureDocument } from './schema/fee.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateFeeStructureDto } from './dto/createFee.dto';

@Injectable()
export class FeeService {
  constructor(
    @InjectModel(FeeStructure.name)
    private readonly feeModel: Model<FeeStructureDocument>,
  ) {}

  async createFeeStructure(data: CreateFeeStructureDto) {
    const payload = {
      ...data,
      class: data.class ? new Types.ObjectId(data.class) : null, // 👈 converts string to ObjectId
    };

    const existing = await this.feeModel.findOne({
      class: payload.class,
      isActive: true,
    });

    if (existing) {
      throw new ConflictException(
        `Fee structure for same class already exists`,
      );
    }

    const fee = new this.feeModel(payload);
    return await fee.save();
  }

  async getAllFeeStructures() {
    const fees = await this.feeModel.find().populate('class', 'grade section');

    if (!fees.length) {
      throw new NotFoundException('No fee structures found');
    }

    return fees;
  }

  async getFeeStructureByGrade(grade: number) {
    return this.feeModel.findOne({ grade, isActive: true }).populate('class');
  }
}
