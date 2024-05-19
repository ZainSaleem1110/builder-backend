import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTemplateFeatureDto } from "./dto/create-template-feature.dto";
import { UpdateTemplateFeatureDto } from "./dto/update-template-feature.dto";
import { TemplateFeature } from "../template-features/entities/template-feature.entity";

@Injectable()
export class TemplateFeaturesService {
  constructor(
    @InjectRepository(TemplateFeature)
    private templateFeatureRepository: Repository<TemplateFeature>
  ) {}

  create(createTemplateFeatureDto: CreateTemplateFeatureDto) {
    return this.templateFeatureRepository.insert({
      template_id: createTemplateFeatureDto.template_id,
      feature_id: createTemplateFeatureDto.feature_id,
    });
  }

  findAll() {
    return `This action returns all templateFeatures`;
  }

  findOne(id: number) {
    return this.templateFeatureRepository.findOne({
      where: {
        id,
      },
    });
  }
  async findOneByTemplateId(id: number) {
    try {
      const data = await this.templateFeatureRepository.findOne({
        where: {
          template_id: id,
        },
      });
      if (!data) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  update(id: number, updateTemplateFeatureDto: UpdateTemplateFeatureDto) {
    return `This action updates a #${id} templateFeature`;
  }

  async remove(id: number) {
    try {
      const templeFeatures = await this.findOneByTemplateId(id);
      const templateFeatureDelete = await this.templateFeatureRepository.delete(
        templeFeatures.id
      );
      if (templateFeatureDelete?.affected <= 0) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return "Successfully removed";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
    
  }
  async removeByAddOnId(id: number) {
    try {
      const data = await this.templateFeatureRepository.find({
        where: {
          template_id: id,
        },
        select: ["id"],
      });
      if (!data) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      const ids = data.map((data) => {
        return data.id;
      });
      const isDelete = await this.templateFeatureRepository.delete(ids);
      if (isDelete?.affected <= 0) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return "Successfully removed";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async bulkRemoveByAddOnId(id: number) {
    try {
      const data = await this.templateFeatureRepository.find({
        where: {
          template_id: id,
        },
        select: ["id"],
      });
      if (data.length===0) {
       return "";
      }
      const ids = data.map((data) => {
        return data.id;
      });
      const isDelete = await this.templateFeatureRepository.delete(ids);
      if (isDelete?.affected <= 0) {

        return "" ;
 }
      return "Successfully removed";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
