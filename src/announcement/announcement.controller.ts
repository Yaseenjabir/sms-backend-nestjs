import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateAnnouncementDto } from './schema/createAnnouncement';
import { AnnouncementService } from './announcement.service';
import { Response } from 'express';

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post('create')
  async create(@Body() body: CreateAnnouncementDto) {
    return await this.announcementService.createAnnouncement(body);
  }

  @Get('getAllAnnouncement')
  async getAllAnnouncement(@Res() res: Response) {
    return await this.announcementService.getAllAnnouncement(res);
  }
}
