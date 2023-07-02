import { CategoryEntity } from 'src/category/entities/category.entities';
import { CommentsEntity } from 'src/comments/entities/comments.entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 45 })
  title: string;

  @Column('text')
  content: string;

  @Column('varchar', { length: 230 })
  urlImage: string;

  @OneToMany(() => CommentsEntity, (comment) => comment.post)
  @JoinColumn()
  comments: CommentsEntity[];

  @ManyToOne(() => CategoryEntity, (category) => category.post)
  category: CategoryEntity;
}
