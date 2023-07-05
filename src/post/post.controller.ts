import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { QueryPostDto } from './dto/query-post.dto';
import { PostEntity } from './entities/post.entities';
import { PostDto } from './dto/post.dto';
import { PostPatchDto } from './dto/post-patch.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAll(@Query() query: QueryPostDto): Promise<PostEntity[]> {
    const defaultQuery = {
      limit: 21,
      query: '',
      order: 'id',
    };
    query = { ...defaultQuery, ...query };
    return this.postService.getAll(query);
  }

  @Get(':id')
  find(@Param('id') id: number): Promise<PostEntity> {
    return this.postService.getId(id);
  }

  @Post()
  async create(@Body() body: PostDto): Promise<PostEntity> {
    return this.postService.insert(body);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PostDto,
  ): Promise<PostEntity> {
    return this.postService.update(id, body);
  }

  @Patch(':id')
  async patch(
    @Param('id') id: number,
    @Body() body: PostPatchDto,
  ): Promise<PostEntity> {
    return this.postService.patch(id, body);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
