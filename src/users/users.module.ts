import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersResolver } from './users.resolver';
import { OrdersService } from 'src/orders/orders.service';

@Module({
  controllers: [UsersController],
  providers: [UsersResolver, UsersService, PrismaService, OrdersService],
  exports: [UsersService], 
})
export class UsersModule {}