import { CommentsEntity } from 'src/comments/entities/comments.entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 15 })
  title: string;

  @Column('text')
  content: string;

  @OneToMany(() => CommentsEntity, (comment) => comment.post)
  @JoinColumn()
  comments: CommentsEntity[];
}
