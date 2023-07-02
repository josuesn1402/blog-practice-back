import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryEntity } from './entities/category.entities';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from './dto/category.dto';
import { QueryCategoryDto } from './dto/query-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  getAll(query: QueryCategoryDto): Promise<CategoryEntity[]> {
    return this.categoryRepository.find({
      take: query.limit,
      where: { description: Like(`%${query.query}%`) },
    });
  }
  async insert(body: CategoryDto): Promise<CategoryEntity> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { description: body.description },
    });

    if (existingCategory) {
      throw new BadRequestException(
        `La categoría '${body.description}' ya existe.`,
      );
    }
    const category = this.categoryRepository.create(body);
    await this.categoryRepository.save(category);
    return category;
  }

  async update(id: number, body: CategoryDto): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`No he encontrado la categoria con id ${id}`);
    }
    category.description = body.description;

    return this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (category) {
      await this.categoryRepository.remove(category);
      return;
    }
    throw new NotFoundException(`No he encontrado el categorio con id ${id}`);
  }
}
