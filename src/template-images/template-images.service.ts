import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTemplateImageDto } from './dto/create-template-image.dto';
import { UpdateTemplateImageDto } from './dto/update-template-image.dto';
import { TemplateImage } from './entities/template-image.entity';

@Injectable()
export class TemplateImagesService {
  constructor(
    @InjectRepository(TemplateImage)
    private templateImageRepository: Repository<TemplateImage>,
  ) {}

  create(createTemplateImageDto: CreateTemplateImageDto) {
    return this.templateImageRepository.insert({
      template_id: createTemplateImageDto.template_id,
      url: createTemplateImageDto.url,
      is_mobile: createTemplateImageDto.is_mobile,
    });
  }

  async findOneByTemplateId(id: number) {
    try {
      const data = await this.templateImageRepository.find({
        where: {
          template_id: id,
        },
      });
           return data;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  findAll() {
    return `This action returns all templateImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} templateImage`;
  }

  update(id: number, updateTemplateImageDto: UpdateTemplateImageDto) {
    return `This action updates a #${id} templateImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} templateImage`;
  }
}
