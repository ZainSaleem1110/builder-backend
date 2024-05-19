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
import { FeaturesService } from "./features.service";
import { CreateFeatureDto } from "./dto/create-feature.dto";
import { UpdateFeatureDto } from "./dto/update-feature.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("features")
// @UseGuards(AuthGuard)
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto) {
    return this.featuresService.create(createFeatureDto);
  }


  @Get()
  findAll() {
    return this.featuresService.findAll();
  }

  @Get("searchbyname")
  searchByName(@Query('name') name: string) {
    return this.featuresService.searchByName(name);
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.featuresService.findOne(+id);
  }
 

  @Get("category/:id")
  findByCategory(@Param("id") id: string) {
    return this.featuresService.findByCategory(+id);
  }
 

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFeatureDto: UpdateFeatureDto) {
    return this.featuresService.update(+id, updateFeatureDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.featuresService.remove(+id);
  }
}
