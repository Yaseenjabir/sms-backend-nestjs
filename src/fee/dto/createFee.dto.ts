import {
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateFeeStructureDto {
  @IsString()
  title: string;

  @IsArray()
  components: {
    name: string;
    amount: number;
    frequency: 'monthly' | 'quarterly' | 'yearly' | 'one-time';
  }[];

  @IsOptional()
  @IsNumber()
  admissionFee?: number;

  @IsOptional()
  @IsNumber()
  securityDeposit?: number;

  @IsOptional()
  @IsArray()
  discounts?: {
    description: string;
    amount: number;
  }[];

  @IsOptional()
  class?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
