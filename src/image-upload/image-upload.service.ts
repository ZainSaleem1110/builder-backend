import { Injectable } from '@nestjs/common';
import { CreateImageUploadDto } from './dto/create-image-upload.dto';
import { UpdateImageUploadDto } from './dto/update-image-upload.dto';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs-extra';

@Injectable()
export class ImageUploadService {
  async uploadFile(file: Express.Multer.File): Promise<{ url: string }> {
    const uniqueFilename = uuidv4() + file.originalname;
    if (!fs.existsSync('images')) {
      fs.mkdirSync('images');
    }
    await fs.writeFile(`images/${uniqueFilename}`, file.buffer);
    return { url: `${process.env.BASE_URL}/images/${uniqueFilename}` };
  }

  create(createImageUploadDto: CreateImageUploadDto) {
    return 'This action adds a new imageUpload';
  }

  findAll() {
    return `This action returns all imageUpload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imageUpload`;
  }

  update(id: number, updateImageUploadDto: UpdateImageUploadDto) {
    return `This action updates a #${id} imageUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} imageUpload`;
  }
}
