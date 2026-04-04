import { IsString, IsNumber, IsArray, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  stock?: number;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsUUID()
  categoryId: string;
}