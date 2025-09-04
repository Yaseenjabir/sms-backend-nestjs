// student.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Class, Section } from 'src/class/schema/class.schema';

export type StudentDocument = Student & Document;

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  rollNo: number;

  @Prop({ required: true })
  grade: number;

  @Prop({ required: true, enum: Object.values(Section) })
  section: Section;

  @Prop({ required: true })
  dob: string;

  @Prop({ required: true, enum: Object.values(Gender) })
  gender: Gender;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  admissionDate: string;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  class: Class;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
