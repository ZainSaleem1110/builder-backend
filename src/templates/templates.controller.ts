import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { TemplatesService } from "./templates.service";
import { CreateTemplateDto } from "./dto/create-template.dto";
import { UpdateTemplateDto } from "./dto/update-template.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("templates")
// @UseGuards(AuthGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(createTemplateDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.templatesService.findAll(query);
  }

  @Get("/findbyverticals")
  findbyverticals(@Body("id") id: [number]) {
    return this.templatesService.findbyverticals(id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.templatesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTemplateDto: UpdateTemplateDto
  ) {
    return this.templatesService.update(+id, updateTemplateDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.templatesService.remove(+id);
  }
}
