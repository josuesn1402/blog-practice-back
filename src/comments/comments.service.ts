import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { QueryCommentsDto } from './dto/query-commets.dto';
import { CommentsDto } from './dto/comments.dto';
import { CommentsEntity } from './entities/comments.entities';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private commentRepository: Repository<CommentsEntity>,
  ) {}

  getAll(query: QueryCommentsDto): Promise<CommentsEntity[]> {
    return this.commentRepository.find({
      take: query.limit,
      where: [{ content: Like(`%${query.query}%`) }],
    });
  }

  async getId(id: number): Promise<CommentsEntity> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (comment) {
      return comment;
    }
    throw new NotFoundException(`No  puedo encontrar ese commentario`);
  }

  async insert(body: CommentsDto): Promise<CommentsEntity> {
    const comment = this.commentRepository.create(body);
    await this.commentRepository.save(comment);
    return comment;
  }

  async update(id: number, body: CommentsDto): Promise<CommentsEntity> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(
        `No se encontró el comentario con el id ${id}`,
      );
    }

    comment.content = body.content;

    return this.commentRepository.save(comment);
  }

  async delete(id: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (comment) {
      await this.commentRepository.remove(comment);
      return;
    }
    throw new NotFoundException(`No he encontrado el comentario con id ${id}`);
  }
}
