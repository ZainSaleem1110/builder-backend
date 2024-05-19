import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSelectedPhaseDto } from './dto/create-selected-phase.dto';
import { UpdateSelectedPhaseDto } from './dto/update-selected-phase.dto';
import { SelectedPhase } from './entities/selected-phase.entity';

@Injectable()
export class SelectedPhasesService {
  constructor(
    @InjectRepository(SelectedPhase)
    private selectedPhaseRepository: Repository<SelectedPhase>,
  ) {}
  create(createSelectedPhaseDto: CreateSelectedPhaseDto) {
    return 'This action adds a new selectedPhase';
  }

  findAll() {
    return `This action returns all selectedPhases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} selectedPhase`;
  }

  update(id: number, updateSelectedPhaseDto: UpdateSelectedPhaseDto) {
    return `This action updates a #${id} selectedPhase`;
  }

  remove(id: number) {
    return `This action removes a #${id} selectedPhase`;
  }
}
