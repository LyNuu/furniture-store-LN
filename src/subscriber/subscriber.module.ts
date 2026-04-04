import { Module } from '@nestjs/common';
import { NewsletterService } from './subscriber.service';
import { NewsletterController } from './subscriber.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [NewsletterController],
  providers: [NewsletterService, PrismaService],
})
export class NewsletterModule {}