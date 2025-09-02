import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Announcement, AnnouncementDocument } from './schema/announcement';
import { Model } from 'mongoose';
import { CreateAnnouncementDto } from './schema/createAnnouncement';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectModel(Announcement.name)
    private announcementModel: Model<AnnouncementDocument>,
  ) {}
  async createAnnouncement(body: CreateAnnouncementDto): Promise<Announcement> {
    const announcement = new this.announcementModel(body);
    return await announcement.save();
  }
}
