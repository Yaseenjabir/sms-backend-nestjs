import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  start_date: string;

  @IsString()
  end_date: string;

  @Type(() => Number) // 👈 transform string -> number
  @IsNumber()
  @Min(1)
  class_from: number;

  @Type(() => Number) // 👈 transform string -> number
  @IsNumber()
  @Min(1)
  class_to: number;

  @IsEnum(['UPCOMING', 'ONGOING', 'COMPLETED'])
  status: string;

  @IsString()
  @IsOptional()
  date_sheet_image?: string;
}
