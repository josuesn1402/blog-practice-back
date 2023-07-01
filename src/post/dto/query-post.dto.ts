import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
} from 'class-validator';

export class QueryPostDto {
  @IsString()
  @Length(1, 25)
  @IsOptional()
  query: string;

  @Type(() => Number)
  @Max(100)
  @IsInt()
  @IsOptional()
  limit: number;

  @IsString()
  @Matches('title')
  @IsOptional()
  order: string;
}
