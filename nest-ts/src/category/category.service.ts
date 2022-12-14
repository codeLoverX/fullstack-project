import { Injectable } from '@nestjs/common';
// import CreateCategoryDto from './dto/createCategory.dto';
// import Category from './category.entity';
// import UpdateCategoryDto from './dto/updateCategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import Category from './entities/category.entity';
// import CategoryNotFoundException from './exceptions/categoryNotFound.exception';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ) {}

  findAll() {
    return this.categoriesRepository.find({ relations: ['posts'] });
  }

  async findOne(id: number) {
    // const category = await this.categoriesRepository.findOne(id, { relations: ['posts'] });
    // if (category) {
    //   return category;
    // }
    // throw new CategoryNotFoundException(id);
  }

  async create(category: CreateCategoryDto) {
    const newCategory = await this.categoriesRepository.create(category);
    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }

  async update(id: number, category: UpdateCategoryDto) {
    // await this.categoriesRepository.update(id, category);
    // const updatedCategory = await this.categoriesRepository.findOne(id, { relations: ['posts'] });
    // if (updatedCategory) {
    //   return updatedCategory
    // }
    // throw new CategoryNotFoundException(id);
  }

  async remove(id: number) {
    const deleteResponse = await this.categoriesRepository.delete(id);
    if (!deleteResponse.affected) {
      // throw new CategoryNotFoundException(id);
    }
  }
}
