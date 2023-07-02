import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QueryCommentsDto } from './dto/query-commets.dto';
import { CommentsDto } from './dto/comments.dto';
import { CommentsService } from './comments.service';
import { CommentsEntity } from './entities/comments.entities';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getAll(@Query() query: QueryCommentsDto): Promise<CommentsEntity[]> {
    const defaultQuery = {
      limit: 30,
      query: '',
    };
    query = { ...defaultQuery, ...query };
    return this.commentsService.getAll(query);
  }

  @Get(':id')
  find(@Param('id') id: number): Promise<CommentsEntity> {
    return this.commentsService.getId(id);
  }

  @Post()
  async create(@Body() body: CommentsDto): Promise<CommentsEntity> {
    return this.commentsService.insert(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: CommentsDto,
  ): Promise<CommentsEntity> {
    return this.commentsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.delete(id);
  }
}
