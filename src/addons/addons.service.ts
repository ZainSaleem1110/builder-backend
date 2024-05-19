import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateAddonDto } from "./dto/create-addon.dto";
import { UpdateAddonDto } from "./dto/update-addon.dto";
import { Addon } from "./entities/addon.entity";
import { AddonFeaturesService } from "../addon-features/addon-features.service";

@Injectable()
export class AddonsService {
  constructor(
    @InjectRepository(Addon)
    private addonRepository: Repository<Addon>,
    private addonFeatureService: AddonFeaturesService
  ) { }

  uploadFile() {
    return true;
  }

  async create(createAddonDto: CreateAddonDto) {
    try {
      const created = await this.addonRepository.insert({
        name: createAddonDto.name,
        tagline: createAddonDto.tagline,
        image: createAddonDto.image,
        duration: createAddonDto.duration,
        duration_type: createAddonDto.duration_type,
        cost: createAddonDto.cost,
        number_of_users: createAddonDto.number_of_users,
      });

      const addonId = created.raw[0].id;

      const features = createAddonDto.features ?? [];

      for (let index = 0; index < features.length; index++) {
        const element = features[index];
        await this.addonFeatureService.create({
          name: element.name,
          addon_id: addonId,
        });
      }

      return created;
    } catch (error) { }
  }

  findAll() {
    return this.addonRepository.find({
      relations: {
        features: true,
      },
      order:{updatedAt: "DESC"}
    });
  }

  findOne(id: number) {
    return this.addonRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateAddonDto: UpdateAddonDto) {
    const group = await this.addonRepository.findOne({
      where: {
        id
      }
    });
    group.name = updateAddonDto.name
    group.cost = updateAddonDto.cost
    group.tagline = updateAddonDto.tagline
    group.duration = updateAddonDto.duration
    group.duration_type = updateAddonDto.duration_type
    await this.addonRepository.save(group);
    if (updateAddonDto.features.length) {
      await this.addonFeatureService.deletebyAddonID(id)
      for (let index = 0; index < updateAddonDto.features.length; index++) {
        let feature = updateAddonDto.features[index]
        await this.addonFeatureService.create({
          name: feature.name,
          addon_id: id,
        })
      }
    }
    return "Successfully Updated";
  }

  async remove(id: number) {
    try {
      await this.addonFeatureService.removeByAddOnId(id);
      const templateDelete = await this.addonRepository.delete(id);
      if (templateDelete?.affected <= 0) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return "Successfully removed";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async whereInData(ids) {
    return this.addonRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
