import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";
import { CategoryFeaturesService } from "../category-features/category-features.service";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private categoryFeatureService: CategoryFeaturesService
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const created = await this.categoryRepository.insert({
      name: createCategoryDto.name,
      image:createCategoryDto.image
    });
    // const categoryId = created.raw[0].id;
    // const features = createCategoryDto.features;
    // for (let index = 0; index < features.length; index++) {
    //   const element = features[index];
    //   await this.categoryFeatureService.create({
    //     category_id: categoryId,
    //     feature_id: element,
    //   });
    // }
    return created;
  }

  findAll() {
    return this.categoryRepository.find({order:{updatedAt: "DESC"}});
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categories = await this.findOne(id);

    return await this.categoryRepository.save({
      ...categories,
      ...updateCategoryDto,
    });
  }

  async remove(id: number) {
    try {
      const categoryDelete = await this.categoryRepository.delete(id);
      if (categoryDelete?.affected <= 0) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return "Successfully removed";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
