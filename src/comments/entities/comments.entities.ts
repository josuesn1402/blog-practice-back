import { PostEntity } from 'src/post/entities/post.entities';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

@Entity('comment')
export class CommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  content: string;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  post: PostEntity;
}
