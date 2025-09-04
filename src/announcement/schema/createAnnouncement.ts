import { IsString, IsIn, IsBoolean } from 'class-validator';

export class CreateAnnouncementDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsIn(['parent', 'teacher', 'student', 'all'])
  to_whom: string;

  @IsIn(['low', 'medium', 'high'])
  priority: string;

  @IsBoolean()
  is_active: boolean;
}
