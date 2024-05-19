import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { TemplateImagesService } from "./template-images.service";
import { CreateTemplateImageDto } from "./dto/create-template-image.dto";
import { UpdateTemplateImageDto } from "./dto/update-template-image.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("template-images")
@UseGuards(AuthGuard)
export class TemplateImagesController {
  constructor(private readonly templateImagesService: TemplateImagesService) {}

  @Post()
  create(@Body() createTemplateImageDto: CreateTemplateImageDto) {
    return this.templateImagesService.create(createTemplateImageDto);
  }

  @Get()
  findAll() {
    return this.templateImagesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.templateImagesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTemplateImageDto: UpdateTemplateImageDto
  ) {
    return this.templateImagesService.update(+id, updateTemplateImageDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.templateImagesService.remove(+id);
  }
}
