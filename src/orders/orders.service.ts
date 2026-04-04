import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, dto: CreateOrderDto) {
  return await this.prisma.$transaction(async (tx) => {
    const orderItemsData = await Promise.all(
      dto.items.map(async (item) => {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new NotFoundException(`Товар с ID ${item.productId} не найден`);
        }

        return {
          quantity: item.quantity,
          priceAtPurchase: product.price, 
          product: {
            connect: { id: item.productId },
          },
        };
      }),
    );

    const order = await tx.order.create({
      data: {
        userId,
        totalAmount: dto.totalAmount,
        status: 'PENDING',
        address: dto.address || "Адрес не указан", 
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    });

    await tx.cartItem.deleteMany({
      where: { userId },
    });

    return order;
  });
}

  async findAllByUser(userId: string) {
    return await this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: true }
        }
      },
    });
    if (!order) throw new BadRequestException('Заказ не найден');
    return order;
  }

  async updateStatus(id: string, status: any) {
    return await this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}