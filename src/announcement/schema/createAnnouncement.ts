import { IsString, IsIn } from 'class-validator';

export class CreateAnnouncementDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsIn(['parent', 'teacher', 'student', 'all'])
  to_whom: string;
}
