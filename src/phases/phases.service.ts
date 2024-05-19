import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreatePhaseDto } from "./dto/create-phase.dto";
import { UpdatePhaseDto } from "./dto/update-phase.dto";
import { Phase } from "./entities/phase.entity";

@Injectable()
export class PhasesService {
  constructor(
    @InjectRepository(Phase)
    private phaseRepository: Repository<Phase>
  ) {}
  async create(createPhaseDto: CreatePhaseDto) {
    const created = await this.phaseRepository.insert({
      name: createPhaseDto.name,
      image: createPhaseDto.image,
    });
    return created;
  }

  findAll() {
    return this.phaseRepository.find({order:{updatedAt: "DESC"}});
  }

  findOne(id: number) {
    return this.phaseRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePhaseDto: UpdatePhaseDto) {
    const phase = await this.findOne(id);

    return await this.phaseRepository.save({
      ...phase,
      ...updatePhaseDto,
    });
  }

  async remove(id: number) {
    try {
      const phaseDelete = await this.phaseRepository.delete(id);
      if (phaseDelete?.affected <= 0) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return "Successfully removed";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async whereInData(ids) {
    return this.phaseRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
