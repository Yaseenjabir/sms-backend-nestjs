import {
  IsEmail,
  IsNotEmpty,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @Length(3, 30)
  @IsNotEmpty()
  name: string;

  @MaxLength(50)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
