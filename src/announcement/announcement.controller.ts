import { Body, Controller, Post } from '@nestjs/common';
import { CreateAnnouncementDto } from './schema/createAnnouncement';
import { AnnouncementService } from './announcement.service';

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post('create')
  async create(@Body() body: CreateAnnouncementDto) {
    return await this.announcementService.createAnnouncement(body);
  }
}
