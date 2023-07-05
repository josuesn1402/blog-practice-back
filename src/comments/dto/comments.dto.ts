import { IsNumber, IsString } from 'class-validator';

export class CommentsDto {
  @IsString()
  content: string;

  @IsNumber()
  post: number;
}
