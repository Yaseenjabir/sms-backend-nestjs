// create-student.dto.ts
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  Min,
  Max,
  IsDateString,
} from 'class-validator';
import { Section } from 'src/class/schema/class.schema';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(3)
  @Max(20)
  age: number;

  @IsNumber()
  @IsNotEmpty()
  rollNo: number;

  @IsNumber()
  @Min(1)
  @Max(12)
  grade: number;

  @IsEnum(Section, { message: 'Section must be a valid value' })
  section: Section;

  @IsDateString({}, { message: 'dob must be a valid date string (YYYY-MM-DD)' })
  dob: string;

  @IsEnum(Gender, { message: 'gender must be male, female or other' })
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsDateString(
    {},
    { message: 'admissionDate must be a valid date string (YYYY-MM-DD)' },
  )
  admissionDate: string;

  @IsString()
  @IsNotEmpty()
  class: string;
}
