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
import { FeatureImagesService } from "./feature-images.service";
import { CreateFeatureImageDto } from "./dto/create-feature-image.dto";
import { UpdateFeatureImageDto } from "./dto/update-feature-image.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("feature-images")
@UseGuards(AuthGuard)
export class FeatureImagesController {
  constructor(private readonly featureImagesService: FeatureImagesService) {}

  @Post()
  create(@Body() createFeatureImageDto: CreateFeatureImageDto) {
    return this.featureImagesService.create(createFeatureImageDto);
  }

  @Get()
  findAll() {
    return this.featureImagesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.featureImagesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateFeatureImageDto: UpdateFeatureImageDto
  ) {
    return this.featureImagesService.update(+id, updateFeatureImageDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.featureImagesService.remove(+id);
  }
}
