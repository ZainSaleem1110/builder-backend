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
import { SelectedFeaturesService } from "./selected-features.service";
import { CreateSelectedFeatureDto } from "./dto/create-selected-feature.dto";
import { UpdateSelectedFeatureDto } from "./dto/update-selected-feature.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("selected-features")
@UseGuards(AuthGuard)
export class SelectedFeaturesController {
  constructor(
    private readonly selectedFeaturesService: SelectedFeaturesService
  ) {}

  @Post()
  create(@Body() createSelectedFeatureDto: CreateSelectedFeatureDto) {
    return this.selectedFeaturesService.create(createSelectedFeatureDto);
  }

  @Get()
  findAll() {
    return this.selectedFeaturesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.selectedFeaturesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSelectedFeatureDto: UpdateSelectedFeatureDto
  ) {
    return this.selectedFeaturesService.update(+id, updateSelectedFeatureDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.selectedFeaturesService.remove(+id);
  }
}
