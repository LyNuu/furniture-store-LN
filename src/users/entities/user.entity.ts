import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Order } from '../../orders/entities/order.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field(() => [Order], { nullable: 'itemsAndList' })
  orders?: Order[];
}