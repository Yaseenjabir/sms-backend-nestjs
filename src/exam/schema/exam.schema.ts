// exam.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExamDocument = Exam & Document;

@Schema({ timestamps: true })
export class Exam {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  start_date: string;

  @Prop({ required: true })
  end_date: string;

  @Prop({ required: true, min: 1 })
  class_from: number;

  @Prop({ required: true })
  class_to: number;

  @Prop({ required: true, enum: ['UPCOMING', 'ONGOING', 'COMPLETED'] })
  status: string;

  // For now, store image as string (later replace with cloud reference)
  @Prop()
  date_sheet_image: string;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
