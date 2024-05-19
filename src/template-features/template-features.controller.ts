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
import { TemplateFeaturesService } from "./template-features.service";
import { CreateTemplateFeatureDto } from "./dto/create-template-feature.dto";
import { UpdateTemplateFeatureDto } from "./dto/update-template-feature.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("template-features")
@UseGuards(AuthGuard)
export class TemplateFeaturesController {
  constructor(
    private readonly templateFeaturesService: TemplateFeaturesService
  ) {}

  @Post()
  create(@Body() createTemplateFeatureDto: CreateTemplateFeatureDto) {
    return this.templateFeaturesService.create(createTemplateFeatureDto);
  }

  @Get()
  findAll() {
    return this.templateFeaturesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.templateFeaturesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTemplateFeatureDto: UpdateTemplateFeatureDto
  ) {
    return this.templateFeaturesService.update(+id, updateTemplateFeatureDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.templateFeaturesService.remove(+id);
  }
}
