import { IsString } from 'class-validator';

export class PostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  urlImage: string;

  @IsString()
  category: string;
}
