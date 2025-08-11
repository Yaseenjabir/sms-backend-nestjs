import {
  IsEnum,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Length,
} from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
  PARENT = 'parent',
}

export class CreateUserDto {
  @IsString()
  @Length(3, 30) // Name must be between 3 and 30 characters
  name: string;

  @IsEmail()
  @MaxLength(50) // Email max length 50 characters
  email: string;

  @MinLength(6)
  @MaxLength(20) // Password must be 6–20 characters long
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
