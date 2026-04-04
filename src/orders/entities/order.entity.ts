import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { OrderItem } from './order-item.entity';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  totalAmount: number;

  @Field()
  status: string;

  @Field()
  address: string;

  @Field(() => [OrderItem])
  items: OrderItem[];

  @Field()
  createdAt: Date;
}