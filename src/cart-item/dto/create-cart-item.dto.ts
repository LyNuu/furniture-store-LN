import { IsUUID, IsInt, Min } from 'class-validator';

export class CreateCartItemDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1, { message: 'Количество должно быть не меньше 1' })
  quantity: number;
}