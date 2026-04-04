import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async toggle(dto: CreateFavoriteDto) {
    const { userId, productId } = dto;

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Товар не найден');

    const existing = await this.prisma.favorite.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });

    if (existing) {
      return await this.prisma.favorite.delete({
        where: { id: existing.id },
      });
    }

    return await this.prisma.favorite.create({
      data: { userId, productId },
    });
  }

  async findAllByUser(userId: string) {
    return await this.prisma.favorite.findMany({
      where: { userId },
      include: {
        product: true, 
      },
    });
  }
}