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
import { SelectedAddonsService } from "./selected-addons.service";
import { CreateSelectedAddonDto } from "./dto/create-selected-addon.dto";
import { UpdateSelectedAddonDto } from "./dto/update-selected-addon.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("selected-addons")
@UseGuards(AuthGuard)
export class SelectedAddonsController {
  constructor(private readonly selectedAddonsService: SelectedAddonsService) {}

  @Post()
  create(@Body() createSelectedAddonDto: CreateSelectedAddonDto) {
    return this.selectedAddonsService.create(createSelectedAddonDto);
  }

  @Get()
  findAll() {
    return this.selectedAddonsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.selectedAddonsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSelectedAddonDto: UpdateSelectedAddonDto
  ) {
    return this.selectedAddonsService.update(+id, updateSelectedAddonDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.selectedAddonsService.remove(+id);
  }
}
