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
import { SelectedPhasesService } from "./selected-phases.service";
import { CreateSelectedPhaseDto } from "./dto/create-selected-phase.dto";
import { UpdateSelectedPhaseDto } from "./dto/update-selected-phase.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("selected-phases")
@UseGuards(AuthGuard)
export class SelectedPhasesController {
  constructor(private readonly selectedPhasesService: SelectedPhasesService) {}

  @Post()
  create(@Body() createSelectedPhaseDto: CreateSelectedPhaseDto) {
    return this.selectedPhasesService.create(createSelectedPhaseDto);
  }

  @Get()
  findAll() {
    return this.selectedPhasesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.selectedPhasesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSelectedPhaseDto: UpdateSelectedPhaseDto
  ) {
    return this.selectedPhasesService.update(+id, updateSelectedPhaseDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.selectedPhasesService.remove(+id);
  }
}
