import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entities';
import { Repository } from 'typeorm';
import { CategoryDto } from '../dto/category.dto';
import { PostEntity } from '../entities/post.entities';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async insertCategory(id: number, body: CategoryDto) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (post) {
      const category = this.categoryRepository.create(body);
      category.post = post;
      return await this.categoryRepository.save(category);
    }
    throw new NotFoundException(`El producto con id ${id} no existe`);
  }
}
