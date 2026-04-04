import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';

@ObjectType()
export class OrderItem {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  priceAtPurchase: number;

  @Field(() => Product)
  product: Product;
}