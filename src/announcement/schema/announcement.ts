import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnnouncementDocument = Announcement & Document;

@Schema({ timestamps: true })
export class Announcement {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['parent', 'teacher', 'student', 'all'] })
  to_whom: string;

  @Prop()
  date_sheet_image?: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
