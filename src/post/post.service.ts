import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entities';
import { Like, Repository } from 'typeorm';
import { QueryPostDto } from './dto/query-post.dto';
import { PostDto } from './dto/post.dto';
import { PostPatchDto } from './dto/post-patch.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
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
    throw new NotFoundException(`No  puedo encontrar ese post`);
  }

  async insert(body: PostDto): Promise<PostEntity> {
    const post = this.postRepository.create(body);
    await this.postRepository.save(post);
    return post;
  }

  async update(id: number, body: PostDto | PostPatchDto): Promise<PostEntity> {
    const inputPost = {
      id,
      ...body,
    };
    const post = await this.postRepository.preload(inputPost);
    if (post) {
      return this.postRepository.save(post);
    }
    throw new NotFoundException(`No he encontrado el post con id ${id}`);
  }

  async delete(id: number): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (post) {
      await this.postRepository.remove(post);
      return;
    }
    throw new NotFoundException(`No he encontrado el post con id ${id}`);
  }
}
