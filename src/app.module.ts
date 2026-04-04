import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { FavoritesModule } from './favorite/favorite.module';
import { ReviewsModule } from './review/review.module';
import { NewsletterModule } from './subscriber/subscriber.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { AiModule } from "./ai/ai.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), 
      sortSchema: true,
    }),
    ConfigModule.forRoot({isGlobal: true}),
    PrismaModule,
    ProductsModule,
    UsersModule,
    CategoriesModule,
    OrdersModule,
    CartItemModule,
    FavoritesModule,
    ReviewsModule,
    NewsletterModule,
    AuthModule,
    AiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }