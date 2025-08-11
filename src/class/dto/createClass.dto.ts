import {
  IsEnum,
  IsInt,
  IsPositive,
  IsString,
  Min,
  Max,
  Length,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsOptional,
  ValidateNested,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Section } from '../schema/class.schema';

class WeeklyScheduleDto {
  @IsArray()
  monday: string[];

  @IsArray()
  tuesday: string[];

  @IsArray()
  wednesday: string[];

  @IsArray()
  thursday: string[];

  @IsArray()
  friday: string[];

  @IsArray()
  saturday: string[];
}

export class CreateClassDto {
  @IsInt()
  @Min(1)
  @Max(12)
  grade: number;

  @IsInt()
  @IsPositive()
  room: number;

  @IsEnum(Section, { message: 'Section must be G, B, or R' })
  section: Section;

  @IsString()
  @Length(2, 50)
  teacher: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  students?: number;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(15)
  @IsString({ each: true })
  subjects: string[];

  @IsDefined({ message: 'Weekly schedule is required' })
  @ValidateNested()
  @Type(() => WeeklyScheduleDto)
  weeklySchedule: WeeklyScheduleDto;
}
