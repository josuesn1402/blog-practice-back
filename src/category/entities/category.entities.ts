import { PostEntity } from 'src/post/entities/post.entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 40 })
  description: string;

  @OneToMany(() => PostEntity, (post) => post.category)
  @JoinColumn()
  post: PostEntity[];
}
