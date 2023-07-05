import { IsBoolean, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  urlImage: string;

  @IsBoolean()
  estado: boolean;

  @IsString()
  category: string;
}
