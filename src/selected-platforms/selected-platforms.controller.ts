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
import { SelectedPlatformsService } from "./selected-platforms.service";
import { CreateSelectedPlatformDto } from "./dto/create-selected-platform.dto";
import { UpdateSelectedPlatformDto } from "./dto/update-selected-platform.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("selected-platforms")
@UseGuards(AuthGuard)
export class SelectedPlatformsController {
  constructor(
    private readonly selectedPlatformsService: SelectedPlatformsService
  ) {}

  @Post()
  create(@Body() createSelectedPlatformDto: CreateSelectedPlatformDto) {
    return this.selectedPlatformsService.create(createSelectedPlatformDto);
  }

  @Get()
  findAll() {
    return this.selectedPlatformsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.selectedPlatformsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSelectedPlatformDto: UpdateSelectedPlatformDto
  ) {
    return this.selectedPlatformsService.update(+id, updateSelectedPlatformDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.selectedPlatformsService.remove(+id);
  }
}
