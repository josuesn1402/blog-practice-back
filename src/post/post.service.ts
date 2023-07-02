import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entities';
import { DeepPartial, Like, Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';
import { PostPatchDto } from './dto/post-patch.dto';
import { QueryPostDto } from './dto/query-post.dto';
import { CategoryEntity } from 'src/category/entities/category.entities';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  getAll(query: QueryPostDto): Promise<PostEntity[]> {
    return this.postRepository.find({
      take: query.limit,
      where: { title: Like(`%${query.query}%`) },
      order: { [query.order]: 'DESC' },
    });
  }

  async getId(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (post) {
      return this.postRepository.create(post);
    }
    throw new NotFoundException(`No puedo encontrar ese post`);
  }

  async insert(body: PostDto): Promise<PostEntity> {
    const category = await this.findOrCreateCategory(body.category);

    const post = this.postRepository.create({
      ...body,
      category,
    });

    await this.postRepository.save(post);
    return post;
  }

  async update(id: number, body: PostDto | PostPatchDto): Promise<PostEntity> {
    const inputPost: DeepPartial<PostEntity> = {
      id,
      ...body,
      category: { description: body.category } as DeepPartial<CategoryEntity>,
    };

    if (body.category) {
      const category = await this.findOrCreateCategory(body.category);
      inputPost.category = category;
    }

    const post = await this.postRepository.preload(inputPost);

    if (post) {
      return this.postRepository.save(post);
    }

    throw new NotFoundException(`No se encontró el post con el id ${id}`);
  }

  async patch(id: number, body: PostPatchDto): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`No se encontró el post con el id ${id}`);
    }

    if (body.title) {
      post.title = body.title;
    }
    if (body.content) {
      post.content = body.content;
    }
    if (body.urlImage) {
      post.urlImage = body.urlImage;
    }
    if (body.category) {
      const category = await this.findOrCreateCategory(body.category);
      post.category = category;
    }

    return this.postRepository.save(post);
  }

  async delete(id: number): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (post) {
      await this.postRepository.remove(post);
      return;
    }
    throw new NotFoundException(`No he encontrado el post con id ${id}`);
  }

  private async findOrCreateCategory(
    categoryName: string,
  ): Promise<CategoryEntity> {
    let category = await this.categoryRepository.findOne({
      where: { description: categoryName },
    });

    if (!category) {
      category = this.categoryRepository.create({ description: categoryName });
      category = await this.categoryRepository.save(category);
    }

    return category;
  }
}
