import { Body, Controller, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from '../dto/category.dto';

@Controller('post')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post(':id/category')
  insertCategory(@Param('id') id: number, @Body() body: CategoryDto) {
    return this.categoryService.insertCategory(id, body);
  }
}
