import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreatePlatformDto } from "./dto/create-platform.dto";
import { UpdatePlatformDto } from "./dto/update-platform.dto";
import { Platform } from "./entities/platform.entity";

@Injectable()
export class PlatformsService {
  constructor(
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>
  ) {}
  async create(createPlatformDto: CreatePlatformDto) {
    const created = await this.platformRepository.insert({
      name: createPlatformDto.name,
      image: createPlatformDto.image,
    });
    return created;
  }

  findAll() {
    return this.platformRepository.find({order:{updatedAt: "DESC"}});
  }

  findOne(id: number) {
    return this.platformRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePlatformDto: UpdatePlatformDto) {
    const platform = await this.findOne(id);

    return await this.platformRepository.save({
      ...platform,
      ...updatePlatformDto,
    });
  }

  async whereInData(ids) {
    return this.platformRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async remove(id: number) {
    try {
      const platformDelete = await this.platformRepository.delete(id);
      if (platformDelete?.affected <= 0) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return "Successfully removed";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
