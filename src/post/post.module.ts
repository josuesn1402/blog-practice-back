import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entities'; // Asegúrate de importar la entidad correctamente
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    CategoryModule, // Importa y agrega el CategoryModule aquí
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
