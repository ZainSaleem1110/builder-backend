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
import { TemplateSelectedFeaturesService } from "./template-selected-features.service";
import { CreateTemplateSelectedFeatureDto } from "./dto/create-template-selected-feature.dto";
import { UpdateTemplateSelectedFeatureDto } from "./dto/update-template-selected-feature.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("template-selected-features")
@UseGuards(AuthGuard)
export class TemplateSelectedFeaturesController {
  constructor(
    private readonly templateSelectedFeaturesService: TemplateSelectedFeaturesService
  ) {}

  @Post()
  create(
    @Body() createTemplateSelectedFeatureDto: CreateTemplateSelectedFeatureDto
  ) {
    return this.templateSelectedFeaturesService.create(
      createTemplateSelectedFeatureDto
    );
  }

  @Get()
  findAll() {
    return this.templateSelectedFeaturesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.templateSelectedFeaturesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTemplateSelectedFeatureDto: UpdateTemplateSelectedFeatureDto
  ) {
    return this.templateSelectedFeaturesService.update(
      +id,
      updateTemplateSelectedFeatureDto
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.templateSelectedFeaturesService.remove(+id);
  }
}
