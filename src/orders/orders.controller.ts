import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) 
  async create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    const userId = req.user.userId; 
    
    return await this.ordersService.create(userId, createOrderDto);
  }

  @Get('my-orders')
  @UseGuards(AuthGuard('jwt'))
  async findMyOrders(@Req() req) {
    return await this.ordersService.findAllByUser(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne(id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED',
  ) {
    return await this.ordersService.updateStatus(id, status);
  }
}