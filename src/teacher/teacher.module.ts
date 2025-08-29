import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Teacher, TeacherSchema } from './schema/teacher.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Teacher.name, schema: TeacherSchema },
      { name: User.name, schema: UserSchema }, // needed for injecting UserModel too
    ]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService], // export if other modules need TeacherService
})
export class TeacherModule {}
