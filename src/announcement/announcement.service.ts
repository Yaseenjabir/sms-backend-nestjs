import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Announcement, AnnouncementDocument } from './schema/announcement';
import { Model } from 'mongoose';
import { CreateAnnouncementDto } from './schema/createAnnouncement';
import { Response } from 'express';

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

  async getAllAnnouncement(res: Response) {
    const announcements = await this.announcementModel.find();

    if (announcements.length < 1) {
      return res.status(404).json({
        founded: false,
        message: 'No announcement available',
      });
    }

    return res.status(200).json(announcements);
  }
}
