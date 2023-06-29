import { CommentsDto } from './comments.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CommentsPatchDto extends PartialType(CommentsDto) {}
