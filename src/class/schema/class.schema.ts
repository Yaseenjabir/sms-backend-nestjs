import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Section {
  GREEN = 'G',
  BLUE = 'B',
  RED = 'R',
}

export type WeeklySchedule = {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
};

@Schema({ timestamps: true })
export class Class extends Document {
  @Prop({ required: true })
  grade: number;

  @Prop({ required: true })
  room: number;

  @Prop({ required: true, enum: Section })
  section: Section;

  @Prop({ required: true })
  teacher: string;

  @Prop({ default: 0 })
  students?: number;

  @Prop({ required: true, type: [String] })
  subjects: string[];

  @Prop({ type: Object, required: true })
  weeklySchedule: WeeklySchedule;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
export type ClassDocument = Class & Document;
