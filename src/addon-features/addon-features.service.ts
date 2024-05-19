import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAddonFeatureDto } from "./dto/create-addon-feature.dto";
import { UpdateAddonFeatureDto } from "./dto/update-addon-feature.dto";
import { AddonFeature } from "./entities/addon-feature.entity";

@Injectable()
export class AddonFeaturesService {
  constructor(
    @InjectRepository(AddonFeature)
    private addonFeatureRepository: Repository<AddonFeature>
  ) {}

  create(createAddonFeatureDto: CreateAddonFeatureDto) {
    try {
      const feature = this.addonFeatureRepository.insert({
        name: createAddonFeatureDto.name,
        addon_id: createAddonFeatureDto.addon_id,
      });

      return feature;
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return this.addonFeatureRepository.find();
  }

  deletebyAddonID(id) {
    return this.addonFeatureRepository.delete({addon_id: id});
  }

  findOne(id: number) {
    return this.addonFeatureRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateAddonFeatureDto: UpdateAddonFeatureDto) {
    return `This action updates a #${id} addonFeature`;
  }

  async remove(id: number) {
    try {
      const isDelete = await this.addonFeatureRepository.delete(id);
      if (isDelete?.affected <= 0) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return "Successfully removed";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async removeByAddOnId(id: number) {
    try {
      const data = await this.addonFeatureRepository.find({
        where: {
          addon_id: id,
        },
        select: ["id"],
      });
      
      if (data.length<=0) {
      return "";
      }
      const ids = data.map((data) => {
        return data.id;
      });
      const isDelete = await this.addonFeatureRepository.delete(ids);
      if (isDelete?.affected <= 0) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return "Successfully removed";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
