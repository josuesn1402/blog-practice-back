import { Body, Controller, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from '../dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post(':id/caregory')
  insertReview(@Param('id') id: number, @Body() body: CategoryDto) {
    return this.categoryService.insertCategory(id, body);
  }
}
