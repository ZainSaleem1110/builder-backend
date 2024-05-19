import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSelectedTemplateDto } from './dto/create-selected-template.dto';
import { UpdateSelectedTemplateDto } from './dto/update-selected-template.dto';
import { SelectedTemplate } from './entities/selected-template.entity';

@Injectable()
export class SelectedTemplatesService {
  constructor(
    @InjectRepository(SelectedTemplate)
    private selectedTemplateRepository: Repository<SelectedTemplate>,
  ) {}
  create(createSelectedTemplateDto: CreateSelectedTemplateDto) {
    return 'This action adds a new selectedTemplate';
  }

  findAll() {
    return `This action returns all selectedTemplates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} selectedTemplate`;
  }

  update(id: number, updateSelectedTemplateDto: UpdateSelectedTemplateDto) {
    return `This action updates a #${id} selectedTemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} selectedTemplate`;
  }
}
