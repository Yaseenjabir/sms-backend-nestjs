import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/createExam.dto';
import { Response } from 'express';

import { Readable } from 'stream';
import { v2 as cloudinary } from 'cloudinary';

// ✅ Initialize cloudinary right here
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dlwzk4uft',
  api_key: process.env.CLOUDINARY_API_KEY || '776958117144841',
  api_secret:
    process.env.CLOUDINARY_API_SECRET || '3Xcz38aPM_g7Cadwozb5vmrnTlY',
});

function bufferToStream(buffer: Buffer): Readable {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('date_sheet_image'))
  async createExam(
    @Body() body: CreateExamDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      try {
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'exams' },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );

          bufferToStream(file.buffer).pipe(uploadStream);
        });

        body.date_sheet_image = uploadResult.secure_url;

        console.log('Bodyy is : ', body);
      } catch (ex) {
        console.log('Exception : ', ex);
      }
    }

    // Save exam with Cloudinary file link
    return await this.examService.createExam(body);
  }

  @Get('getAllExams')
  async getAllExams(@Res() res: Response) {
    const exams = await this.examService.findAll();
    if (!exams.length) {
      return res.status(404).json({
        founded: false,
        message: 'No exams available',
      });
    }
    return res.status(200).json({
      founded: true,
      exams,
    });
  }
}
