import { PartialType } from '@nestjs/mapped-types';
import { PostDto } from './post.dto';

export class PostPatchDto extends PartialType(PostDto) {}
