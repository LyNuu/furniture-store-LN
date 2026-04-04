import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Injectable()
export class NewsletterService {
  constructor(private prisma: PrismaService) {}

  async subscribe(dto: CreateSubscriberDto) {
    const { email } = dto;

    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      throw new ConflictException('Этот email уже подписан на рассылку');
    }

    return await this.prisma.newsletterSubscriber.create({
      data: { email },
    });
  }

  async findAll() {
    return await this.prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(id: string) {
    return await this.prisma.newsletterSubscriber.delete({
      where: { id },
    });
  }
}