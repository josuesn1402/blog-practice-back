import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entities';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CategoryEntity } from './entities/category.entities';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, CategoryEntity])],
  controllers: [PostController, CategoryController],
  providers: [PostService, CategoryService],
})
export class PostModule {}
