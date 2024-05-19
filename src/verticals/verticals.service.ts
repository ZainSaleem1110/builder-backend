import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateVerticalDto } from "./dto/create-vertical.dto";
import { UpdateVerticalDto } from "./dto/update-vertical.dto";
import { Vertical } from "./entities/vertical.entity";

@Injectable()
export class VerticalsService {
  constructor(
    @InjectRepository(Vertical)
    private verticalRepository: Repository<Vertical>
  ) {}

  create(createVerticalDto: CreateVerticalDto) {
    return this.verticalRepository.insert({
      name: createVerticalDto.name,
      image: createVerticalDto.image,
    });
  }

  findAll() {
    return this.verticalRepository.find({order:{updatedAt: "DESC"}});
  }

  findOne(id: number) {
    return this.verticalRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateVerticalDto: UpdateVerticalDto) {
    const vertical = await this.findOne(id);

    return await this.verticalRepository.save({
      ...vertical,
      ...updateVerticalDto,
    });
  }

  async remove(id: number) {
    try {
      const verticalDelete = await this.verticalRepository.delete(id);
      if (verticalDelete?.affected <= 0) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return "Successfully removed";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
