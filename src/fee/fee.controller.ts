import { Body, Controller, Get, Post } from '@nestjs/common';
import { FeeService } from './fee.service';
import { CreateFeeStructureDto } from './dto/createFee.dto';

@Controller('fee')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Post('create')
  async create(@Body() body: CreateFeeStructureDto) {
    return await this.feeService.createFeeStructure(body);
  }

  @Get('getAll')
  async getAll() {
    return await this.feeService.getAllFeeStructures();
  }
}
