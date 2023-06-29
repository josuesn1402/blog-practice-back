import { Comments } from 'src/comments/entities/comments.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class PostEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 15 })
  title: string;

  @Column('text')
  content: string;

  @OneToMany(()=> Comments, (comment) => comment.post)
}
