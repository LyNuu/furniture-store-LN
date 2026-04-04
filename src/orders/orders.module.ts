import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrdersResolver } from './orders.resolver';


@Module({
  controllers: [OrdersController],
  providers: [OrdersResolver,OrdersService, PrismaService],
})
export class OrdersModule {}