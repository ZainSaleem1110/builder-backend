import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateTemplateDto } from "./dto/create-template.dto";
import { UpdateTemplateDto } from "./dto/update-template.dto";
import { Template } from "./entities/template.entity";
import { TemplateFeaturesService } from "../template-features/template-features.service";
import { TemplateImagesService } from "../template-images/template-images.service";
import { VerticalsService } from "src/verticals/verticals.service";
import { PhasesService } from "src/phases/phases.service";
import { PlatformsService } from "src/platforms/platforms.service";
import { AddonsService } from "src/addons/addons.service";
import { FeaturesService } from "../features/features.service";

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private templateRepository: Repository<Template>,
    private templateFeatureService: TemplateFeaturesService,
    private templateImagesService: TemplateImagesService,
    private verticalsService: VerticalsService,
    private phasesService: PhasesService,
    private platformService: PlatformsService,
    private addonsService: AddonsService,
    private featureService: FeaturesService
  ) {}

  async findbyverticals(id: [number]) {
    try {
      const templates = await this.templateRepository.find({
        where: {
          vertical_id: In(id),
        },
      });
      if (templates.length == 0) {
        throw new NotFoundException("No templates found");
      }
      return templates;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async create(createTemplateDto: CreateTemplateDto) {
    const created = await this.templateRepository.insert({
      name: createTemplateDto.name,
      description: createTemplateDto.description,
      vertical_id: createTemplateDto.vertical_id,
      price: createTemplateDto.price,
      addons_id: createTemplateDto.addons_id,
      phases_id: createTemplateDto.phases_id,
      platforms_id: createTemplateDto.platforms_id,
      logo: createTemplateDto.logo,
    });
    const features = createTemplateDto.features ?? [];

    const templateId = created.raw[0].id;
    for (let index = 0; index < features.length; index++) {
      const element = features[index];
      this.templateFeatureService.create({
        template_id: templateId,
        feature_id: element,
      });
    }

    const images = createTemplateDto.images ?? [];

    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      this.templateImagesService.create({
        template_id: templateId,
        url: element ?? "",
        is_mobile: false,
      });
    }

    const mobileImages = createTemplateDto.mobileImages ?? [];

    for (let index = 0; index < mobileImages.length; index++) {
      const element = mobileImages[index];
      this.templateImagesService.create({
        template_id: templateId,
        url: element ?? "",
        is_mobile: true,
      });
    }

    return created;
  }

  async findAll(query: any = null) {
    try {
      if (query && query.verticals) {
        const verticals = query.verticals.split(",");
        const data = await this.templateRepository.find({
          relations: {
            features: true,
          },
          where: {
            vertical_id: In(verticals),
          },
        });
        if (!data) {
          throw new NotFoundException("Not found");
        }
        for (let i = 0; i < data.length; ++i) {
          const vertical = await this.verticalsService.findOne(
            data[i].vertical_id
          );
          data[i]["vertical"] = vertical;
          const phases = await this.phasesService.findOne(data[i].phases_id);
          const platforms = await this.phasesService.findOne(
            data[i].platforms_id
          );

          const addons = await this.addonsService.findOne(data[i].addons_id);
          data[i]["phases"] = phases;
          data[i]["platforms"] = platforms;
          data[i]["addons"] = addons;
        }
        return data;
      } else {
        const data = await this.templateRepository.find({
          relations: {
            features: true,
            // images:true,
          },
          order:{updatedAt: "DESC"}
        });
        if (!data) {
          throw new NotFoundException("Not found");
        }
        for (let i = 0; i < data.length; ++i) {
          const imageFinder =
            await this.templateImagesService.findOneByTemplateId(data[i].id);
          delete data[i]["images"];
          data[i]["image"] = imageFinder.reverse();
          const vertical = await this.verticalsService.findOne(
            data[i].vertical_id
          );
          data[i]["vertical"] = vertical;
          // const phases = await this.phasesService.findOne(data[i].phases_id);
          // const platforms = await this.phasesService.findOne(
          //   data[i].platforms_id
          // );
          // const addons = await this.addonsService.findOne(data[i].addons_id);

          const selectedFeatures = data[i].features;

          const compiledFeatures = [];
          let total_f_cost = 0;
          let total_f_customization_cost = 0;
          for (let index = 0; index < selectedFeatures.length; index++) {
            const element: any = selectedFeatures[index];
            const response = await this.featureService.findOne(
              element.feature_id
            );
            total_f_cost += response?.cost ?? 0;
            total_f_customization_cost +=response?.customization_cost ?? 0;
            compiledFeatures.push(response);
          }
          data[i].price = total_f_cost + total_f_customization_cost;
          data[i]["phases"] = [];
          data[i]["platforms"] = [];
          data[i]["addons"] = [];
          data[i]["features"] = compiledFeatures;
          // test
        }
        return data;
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  // async findAll() {
  //   try{
  //   const data = await this.templateRepository.find({
  //     relations: {
  //       features: true,
  //     },
  //   });
  //   if(!data){
  //     throw new NotFoundException("Not found")
  //   }
  //   for(let i=0;i<data.length;++i){
  //     const vertical = await this.verticalsService.findOne(data[i].vertical_id);
  //     data[i]["vertical"] = vertical;
  //     const phases = await this.phasesService.findOne(data[i].phases_id);
  //     const platforms = await this.phasesService.findOne(data[i].platforms_id);
  //     const addons= await this.addonsService.findOne(data[i].addons_id);
  //     data[i]["phases"]= phases;
  //     data[i]['platforms']=platforms;
  //     data[i]["addons"]=addons;
  //   }
  //   return data;

  // }catch(error){
  //   throw new HttpException(error.message, error.status);
  // }
  // }

  async findOne(id: number) {
    try {
      const data = await this.templateRepository.findOne({
        where: {
          id,
        },
        relations: {
          features: true,
        },
      });
      const imageFinder = await this.templateImagesService.findOneByTemplateId(
        id
      );

      //TODO: need to review this logic
      const featuresWithImages = [];
      for (let index = 0; index < data.features.length; index++) {
        const element = data.features[index];
        const featureOne = await this.featureService.findOne(
          element.feature_id
        );
        featuresWithImages.push(featureOne);
      }

      delete data["images"];
      data["image"] = imageFinder;
      const vertical = await this.verticalsService.findOne(data.vertical_id);
      data["vertical"] = vertical;
      const phases = await this.phasesService.findOne(data.phases_id);
      const platforms = await this.phasesService.findOne(data.platforms_id);
      const addons = await this.addonsService.findOne(data.addons_id);
      data["phases"] = phases;
      data["platforms"] = platforms;
      data["addons"] = addons;
      data["features"] = featuresWithImages;
      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateTemplateDto: UpdateTemplateDto) {
    await this.templateFeatureService.bulkRemoveByAddOnId(id);
    const features = updateTemplateDto.features ?? [];
    for (let index = 0; index < features.length; index++) {
      const element = features[index];
      await this.templateFeatureService.create({
        template_id: id,
        feature_id: element["value"] ?? element,
      });
    }
    delete updateTemplateDto["features"];
    // delete updateTemplateDto["images"];

    // handle images
    await this.handleImageInsertionWhileUpdatingTemplate(id,updateTemplateDto)

    const data = await this.templateRepository.update(id, {
      name: updateTemplateDto.name,
      description: updateTemplateDto.description,
      logo: updateTemplateDto.logo,
      vertical_id:
        updateTemplateDto.vertical_id["value"] ?? updateTemplateDto.vertical_id,
      price: updateTemplateDto.price,
      addons_id:
        updateTemplateDto.addons_id["value"] ?? updateTemplateDto.addons_id,
      phases_id:
        updateTemplateDto.phases_id["value"] ?? updateTemplateDto.phases_id,
      platforms_id:
        updateTemplateDto.platforms_id["value"] ??
        updateTemplateDto.platforms_id,
    });

    return "Successfully Updated";
  }

  async handleImageInsertionWhileUpdatingTemplate(id, updateTemplateDto) {
    // update images for template 
    const images = updateTemplateDto.images ?? [];
    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      this.templateImagesService.create({
        template_id: id,
        url: element ?? "",
        is_mobile: false,
      });
    }
    const mobileImages = updateTemplateDto.mobileImages ?? [];
    for (let index = 0; index < mobileImages.length; index++) {
      const element = mobileImages[index];
      this.templateImagesService.create({
        template_id: id,
        url: element ?? "",
        is_mobile: true,
      });
    }
    return
  }

  async remove(id: number) {
    try {
      // await this
      await this.templateFeatureService.removeByAddOnId(id);
      const templateDelete = await this.templateRepository.delete(id);
      if (templateDelete?.affected <= 0) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return "Successfully removed";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async whereInData(ids) {
    return this.templateRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
