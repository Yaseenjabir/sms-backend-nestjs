import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

// ---------------- Teaching Class ----------------
@Schema({ _id: false }) // embedded subdocument, no _id for each class
export class TeachingClass {
  @Prop({ type: Number, required: true, min: 1, max: 12 })
  grade: number;

  @Prop({ type: String, required: true })
  section: string;
}
export const TeachingClassSchema = SchemaFactory.createForClass(TeachingClass);

// ---------------- Personal Info ----------------
@Schema({ _id: false })
export class PersonalInfo {
  @Prop({ type: String, enum: ['Mr', 'Mrs'], required: true })
  title: string;

  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, required: true, minlength: 11, maxlength: 11 })
  phone: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  email: string;
}
export const PersonalInfoSchema = SchemaFactory.createForClass(PersonalInfo);

// ---------------- Professional Info ----------------
@Schema({ _id: false })
export class ProfessionalInfo {
  @Prop({ type: String, required: true })
  subject: string;

  @Prop({ type: String, required: true })
  department: string;

  @Prop({ type: String, required: true })
  qualificationDegree: string;

  @Prop({ type: String, required: true })
  qualificationSubject: string;

  @Prop({ type: Number, required: true, min: 1 })
  experience: number;

  @Prop({ type: String, required: true })
  joiningDate: string; // could also be Date type if you want
}
export const ProfessionalInfoSchema =
  SchemaFactory.createForClass(ProfessionalInfo);

// ---------------- Teacher ----------------
@Schema({ timestamps: true })
export class Teacher extends Document {
  @Prop({ type: PersonalInfoSchema, required: true })
  personalInfo: PersonalInfo;

  @Prop({ type: ProfessionalInfoSchema, required: true })
  professionalInfo: ProfessionalInfo;

  @Prop({ type: [TeachingClassSchema], required: true })
  teachingClasses: TeachingClass[];

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
export type TeacherDocument = Teacher & Document;
