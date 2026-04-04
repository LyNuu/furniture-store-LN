import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartItemService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCartItemDto) {
    const { userId, productId, quantity } = dto;

    return await this.prisma.cartItem.upsert({
      where: {
        userId_productId: { userId, productId },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        userId,
        productId,
        quantity,
      },
    });
  }

  async findAllByUser(userId: string) {
    return await this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true }, 
    });
  }

  async remove(id: string) {
    return await this.prisma.cartItem.delete({ where: { id } });
  }

  async clearAll(userId: string) {
    return await this.prisma.cartItem.deleteMany({ where: { userId } });
  }
}