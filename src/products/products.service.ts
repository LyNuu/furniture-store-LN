import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto) {
    const { categoryId, ...productData } = createProductDto;
    return await this.prisma.product.create({
      data: {
        ...productData,
        category: {
          connect: { id: categoryId },
        },
      },
      include: { category: true },
    });
  }

  async findAll() {
    return await this.prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      throw new NotFoundException(`Товар с ID ${id} не найден`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { categoryId, ...productData } = updateProductDto;

    await this.findOne(id);

    return await this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        ...(categoryId && {
          category: { connect: { id: categoryId } },
        }),
      },
      include: { category: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.product.delete({
      where: { id },
    });
  }
}