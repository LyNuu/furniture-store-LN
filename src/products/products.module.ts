import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsResolver } from './products.resolver';

@Module({
  controllers: [ProductsController],
  providers: [ProductsResolver, ProductsService, PrismaService],
})
export class ProductsModule {}
