import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VerticalsService } from './verticals.service';
import { CreateVerticalDto } from './dto/create-vertical.dto';
import { UpdateVerticalDto } from './dto/update-vertical.dto';

@Controller('verticals')
export class VerticalsController {
  constructor(private readonly verticalsService: VerticalsService) {}

  @Post()
  create(@Body() createVerticalDto: CreateVerticalDto) {
    return this.verticalsService.create(createVerticalDto);
  }

  @Get()
  findAll() {
    return this.verticalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.verticalsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVerticalDto: UpdateVerticalDto,
  ) {
    return this.verticalsService.update(+id, updateVerticalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.verticalsService.remove(+id);
  }
}
