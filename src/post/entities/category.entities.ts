import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entities';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 15 })
  description: string;

  @ManyToOne(() => PostEntity, (post) => post.category)
  post: PostEntity;
}
