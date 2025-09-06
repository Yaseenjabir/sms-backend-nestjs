import { Module } from '@nestjs/common';
import { FeeService } from './fee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeeStructure, FeeStructureSchema } from './schema/fee.schema';
import { FeeController } from './fee.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeeStructure.name, schema: FeeStructureSchema },
    ]),
  ],
  controllers: [FeeController],
  providers: [FeeService],
  exports: [FeeService],
})
export class FeeModule {}
