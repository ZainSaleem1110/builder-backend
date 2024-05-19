import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, In, Repository } from "typeorm";
import { CreateFeatureDto } from "./dto/create-feature.dto";
import { UpdateFeatureDto } from "./dto/update-feature.dto";
import { Feature } from "./entities/feature.entity";
import { FeatureImagesService } from "../feature-images/feature-images.service";

@Injectable()
export class FeaturesService {
  searchByName(name: string) {
    // throw new Error("Method not implemented.");
    return this.featureRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
      relations: {
        images: true,
      },
    });
    // return "Helo"
  }
  constructor(
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
    private featureImagesService: FeatureImagesService
  ) {}

  async create(createFeatureDto: CreateFeatureDto) {
    const created = await this.featureRepository.insert({
      name: createFeatureDto.name,
      category_id: createFeatureDto.category_id,
      cost: createFeatureDto.cost,
      duration: createFeatureDto.duration,
      duration_type: createFeatureDto.duration_type,
      //images: createFeatureDto.images,
      description: createFeatureDto.description,
      customization_cost: createFeatureDto.customization_cost,
    });

    const featureId = created.raw[0].id;

    let mobileImage = "";
    let desktopImage = "";

    const images = createFeatureDto.images ?? [];

    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      if (index == 0) {
        desktopImage = element;
      }
      this.featureImagesService.create({
        feature_id: featureId,
        url: element ?? "",
        is_mobile: false,
      });
    }

    const mobileImages = createFeatureDto.mobileImages ?? [];

    for (let index = 0; index < mobileImages.length; index++) {
      const element = mobileImages[index];
      if (index == 0) {
        mobileImage = element;
      }
      this.featureImagesService.create({
        feature_id: featureId,
        url: element ?? "",
        is_mobile: true,
      });
    }

    await this.featureRepository.update(featureId, {
      mobileImage: mobileImage,
      deskImage: desktopImage,
    });

    return created;
  }

  async findAll() {
    // const all = await this.featureRepository.find({
    //   relations: {
    //     images: true,
    //   },
    // });

    // for (let index = 0; index < all.length; index++) {
    //   const element = all[index];
    //   const images = element.images;
    //   const featureId = element.id;
    //   let mobileImage = "";
    //   let desktopImage = "";
    //   for (let index1 = 0; index1 < images.length; index1++) {
    //     const element1 = images[index1];
    //     if (element1.is_mobile && !mobileImage) {
    //       mobileImage = element1.url;
    //     }

    //     if (!element1.is_mobile && !desktopImage) {
    //       desktopImage = element1.url;
    //     }

    //     if (desktopImage && mobileImage) {
    //       continue;
    //     }
    //   }

    //   await this.featureRepository.update(featureId, {
    //     mobileImage: mobileImage,
    //     deskImage: desktopImage,
    //   });
    // }

    return this.featureRepository.find({
      relations: {
        images: true,
      },
      order:{updatedAt: "DESC"}
    });
  }

  findOne(id: number) {
    return this.featureRepository.findOne({
      where: {
        id,
      },
      relations: {
        images: true,
      },
    });
  }

  async update(id: number, updateFeatureDto: UpdateFeatureDto) {
    const data = await this.featureRepository.update(id, {
      name: updateFeatureDto.name,
      category_id:
        updateFeatureDto.category_id["value"] ?? updateFeatureDto.category_id,
      cost: updateFeatureDto.cost,
      duration: updateFeatureDto.duration,
      duration_type: updateFeatureDto.duration_type,
      description: updateFeatureDto.description,
      customization_cost: updateFeatureDto.customization_cost,
    });
    // handle images
    await this.handleImageInsertionWhileUpdatingTemplate(id,updateFeatureDto)

    return "Successfully Updated";
  }

  async handleImageInsertionWhileUpdatingTemplate(id, updateTemplateDto) {
    // update images for template 
    const images = updateTemplateDto.images ?? [];
    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      this.featureImagesService.create({
        feature_id: id,
        url: element ?? "",
        is_mobile: false,
      });
    }
    const mobileImages = updateTemplateDto.mobileImages ?? [];
    for (let index = 0; index < mobileImages.length; index++) {
      const element = mobileImages[index];
      this.featureImagesService.create({
        feature_id: id,
        url: element ?? "",
        is_mobile: true,
      });
    }
    return
  }

  findByCategory(id: number) {
    return this.featureRepository.find({
      where: {
        category_id: id,
      },
      relations: {
        images: true,
      },
    });
  }

  async remove(id: number) {
    try {
      await this.featureImagesService.removeByAddOnId(id);
      const featureDelete = await this.featureRepository.delete(id);
      if (featureDelete?.affected <= 0) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return "Successfully removed";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async whereInData(ids) {
    return this.featureRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
