import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReviewDto) {
    const { userId, productId, rating, comment } = dto;

    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Товар не найден');

    return await this.prisma.review.create({
      data: {
        userId,
        productId,
        rating,
        comment,
      },
      include: {
        user: {
          select: { firstName: true, lastName: true }, 
        },
      },
    });
  }

  async findByProduct(productId: string) {
    return await this.prisma.review.findMany({
      where: { productId },
      include: {
        user: {
          select: { firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: 'desc' }, 
    });
  }

  async remove(id: string) {
    return await this.prisma.review.delete({ where: { id } });
  }
}