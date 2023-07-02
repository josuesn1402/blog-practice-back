import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { CategoryEntity } from './entities/category.entities';
import { QueryCategoryDto } from './dto/query-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll(@Query() query: QueryCategoryDto): Promise<CategoryEntity[]> {
    const defaultQuery = {
      limit: 30,
      query: '',
    };
    query = { ...defaultQuery, ...query };
    return this.categoryService.getAll(query);
  }
  @Post()
  create(@Body() body: CategoryDto): Promise<CategoryEntity> {
    return this.categoryService.insert(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: CategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
