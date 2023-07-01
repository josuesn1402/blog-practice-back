import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Length, Max } from 'class-validator';

export class QueryCommentsDto {
  @IsString()
  @Length(1, 25)
  @IsOptional()
  query: string;

  @Type(() => Number)
  @Max(100)
  @IsInt()
  @IsOptional()
  limit: number;
}
