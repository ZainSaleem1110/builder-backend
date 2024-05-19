import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeatureImageDto } from './dto/create-feature-image.dto';
import { UpdateFeatureImageDto } from './dto/update-feature-image.dto';
import { FeatureImage } from './entities/feature-image.entity';

@Injectable()
export class FeatureImagesService {
  constructor(
    @InjectRepository(FeatureImage)
    private featureImageRepository: Repository<FeatureImage>,
  ) {}

  create(createFeatureImageDto: CreateFeatureImageDto) {
    return this.featureImageRepository.insert({
      feature_id: createFeatureImageDto.feature_id,
      url: createFeatureImageDto.url,
      is_mobile: createFeatureImageDto.is_mobile,
    });
  }

  findAll() {
    return `This action returns all featureImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} featureImage`;
  }

  update(id: number, updateFeatureImageDto: UpdateFeatureImageDto) {
    return `This action updates a #${id} featureImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} featureImage`;
  }
  async removeByAddOnId(id: number) {
    try {
      const data = await this.featureImageRepository.find({
        where: {
          feature_id: id,
        },
        select: ["id"],
      });
      if (data?.length <= 0) {
        return ""
      }
      const ids = data.map((data) => {
        return data.id;
      });
      const isDelete = await this.featureImageRepository.delete(ids);
      if (isDelete?.affected <= 0) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return "Successfully removed";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
