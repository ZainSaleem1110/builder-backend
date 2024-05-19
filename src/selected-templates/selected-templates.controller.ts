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
import { SelectedTemplatesService } from "./selected-templates.service";
import { CreateSelectedTemplateDto } from "./dto/create-selected-template.dto";
import { UpdateSelectedTemplateDto } from "./dto/update-selected-template.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("selected-templates")
@UseGuards(AuthGuard)
export class SelectedTemplatesController {
  constructor(
    private readonly selectedTemplatesService: SelectedTemplatesService
  ) {}

  @Post()
  create(@Body() createSelectedTemplateDto: CreateSelectedTemplateDto) {
    return this.selectedTemplatesService.create(createSelectedTemplateDto);
  }

  @Get()
  findAll() {
    return this.selectedTemplatesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.selectedTemplatesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSelectedTemplateDto: UpdateSelectedTemplateDto
  ) {
    return this.selectedTemplatesService.update(+id, updateSelectedTemplateDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.selectedTemplatesService.remove(+id);
  }
}
