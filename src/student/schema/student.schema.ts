import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Section } from 'src/class/schema/class.schema';

@Schema({ timestamps: true })
export class Student extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  rollNo: number;

  @Prop({ required: true })
  grade: number;

  @Prop({ required: true })
  section: Section;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
export type StudentDocument = Student & Document;
