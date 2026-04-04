import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { Category } from '../../categories/entities/category.entity';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  stock: number;

  @Field(() => [String])
  images: string[];

  @Field(() => String)
  categoryId: string;

  @Field(() => Category)
  category: Category;
}