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
      order: { [query.order]: 'ASC' },
    });
  }

  async getId(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (post) {
      return this.postRepository.create(post);
    }
    throw new NotFoundException(`No  puedo encontrar ese producto`);
  }

  async insert(body: PostDto): Promise<PostEntity> {
    const post = this.postRepository.create(body);
    await this.postRepository.save(post);
    return post;
  }

  async update(id: number, body: PostDto | PostPatchDto): Promise<PostEntity> {}
}
