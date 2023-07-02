import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entities';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), CategoryModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
