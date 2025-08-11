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
import { StudentController } from './student/student.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/sms-management'),
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // makes env vars available everywhere
    }),
    ClassModule,
  ],
  controllers: [AppController, AuthController, UserController, StudentController],
  providers: [AppService],
})
export class AppModule {}
