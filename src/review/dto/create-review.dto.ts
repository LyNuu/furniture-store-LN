import { IsString, IsInt, Min, Max, IsUUID, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1, { message: 'Минимальная оценка — 1' })
  @Max(5, { message: 'Максимальная оценка — 5' })
  rating: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  productId: string;
}