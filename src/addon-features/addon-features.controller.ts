import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AddonFeaturesService } from './addon-features.service';
import { CreateAddonFeatureDto } from './dto/create-addon-feature.dto';
import { UpdateAddonFeatureDto } from './dto/update-addon-feature.dto';

@Controller('addon-features')
export class AddonFeaturesController {
  constructor(private readonly addonFeaturesService: AddonFeaturesService) {}

  @Post()
  create(
    @Body() createAddonFeatureDto: CreateAddonFeatureDto,
  ): CreateAddonFeatureDto {
    return this.addonFeaturesService.create(createAddonFeatureDto);
  }

  @Get()
  findAll() {
    return this.addonFeaturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addonFeaturesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAddonFeatureDto: UpdateAddonFeatureDto,
  ) {
    return this.addonFeaturesService.update(+id, updateAddonFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addonFeaturesService.remove(+id);
  }
}
