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
import { CategoryFeaturesService } from "./category-features.service";
import { CreateCategoryFeatureDto } from "./dto/create-category-feature.dto";
import { UpdateCategoryFeatureDto } from "./dto/update-category-feature.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("category-features")
@UseGuards(AuthGuard)
export class CategoryFeaturesController {
  constructor(
    private readonly categoryFeaturesService: CategoryFeaturesService
  ) {}

  @Post()
  create(@Body() createCategoryFeatureDto: CreateCategoryFeatureDto) {
    return this.categoryFeaturesService.create(createCategoryFeatureDto);
  }

  @Get()
  findAll() {
    return this.categoryFeaturesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoryFeaturesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryFeatureDto: UpdateCategoryFeatureDto
  ) {
    return this.categoryFeaturesService.update(+id, updateCategoryFeatureDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoryFeaturesService.remove(+id);
  }
}
