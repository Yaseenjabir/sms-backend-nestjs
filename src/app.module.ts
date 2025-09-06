import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClassModule } from './class/class.module';
import { StudentModule } from './student/student.module';
import { TeacherController } from './teacher/teacher.controller';
import { TeacherModule } from './teacher/teacher.module';
import { ExamController } from './exam/exam.controller';
import { ExamModule } from './exam/exam.module';
import { AnnouncementController } from './announcement/announcement.controller';
import { AnnouncementModule } from './announcement/announcement.module';
import { FeeController } from './fee/fee.controller';
import { FeeModule } from './fee/fee.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/sms-management'),
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // makes env vars available everywhere
    }),
    ClassModule,
    StudentModule,
    TeacherModule,
    ExamModule,
    AnnouncementModule,
    FeeModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    TeacherController,
    ExamController,
    AnnouncementController,
    FeeController,
  ],
  providers: [AppService],
})
export class AppModule {}
