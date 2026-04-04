import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { PrismaService } from 'src/prisma/prisma.service'; // Путь проверь

@Module({
  controllers: [CartItemController],
  providers: [CartItemService, PrismaService],
  exports: [CartItemService],
})
export class CartItemModule {}