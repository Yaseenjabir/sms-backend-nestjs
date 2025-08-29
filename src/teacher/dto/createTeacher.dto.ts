import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
  Max,
  Length,
  IsDefined,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';

// Title Enum
export enum Title {
  MR = 'Mr',
  MRS = 'Mrs',
}

// DTO for TeachingClass
export class TeachingClassDto {
  @IsNumber()
  @Min(1)
  @Max(12)
  grade: number;

  @IsString()
  @IsNotEmpty()
  section: string;
}

// DTO for Personal Info
export class PersonalInfoDto {
  @IsEnum(Title, { message: 'Title must be Mr, Mrs' })
  title: Title;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @Length(11, 11, {
    message: 'Phone number must be exactly 12 characters long',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  email: string;
}

// DTO for Professional Info
export class ProfessionalInfoDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  qualificationDegree: string;

  @IsString()
  @IsNotEmpty()
  qualificationSubject: string;

  @IsNumber()
  @Min(1)
  experience: number; // years of experience

  @IsString()
  @IsNotEmpty()
  joiningDate: string;
}

// Main Teacher DTO
export class CreateTeacherDto {
  @IsDefined({ message: 'personalInfo is required' })
  @ValidateNested()
  @Type(() => PersonalInfoDto)
  personalInfo: PersonalInfoDto;

  @IsDefined({ message: 'professionalInfo is required' })
  @ValidateNested()
  @Type(() => ProfessionalInfoDto)
  professionalInfo: ProfessionalInfoDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeachingClassDto)
  teachingClasses: TeachingClassDto[];
}
