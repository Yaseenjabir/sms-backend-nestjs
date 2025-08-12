import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  Min,
  Max,
} from 'class-validator';
import { Section } from 'src/class/schema/class.schema';

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
}
