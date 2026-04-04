import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createCartItemDto: CreateCartItemDto) {
    return await this.cartItemService.create(createCartItemDto);
  }

  @Get('user/:userId')
  async findAll(@Param('userId') userId: string) {
    return await this.cartItemService.findAllByUser(userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cartItemService.remove(id);
  }

  @Delete('clear/:userId')
  async clear(@Param('userId') userId: string) {
    return await this.cartItemService.clearAll(userId);
  }
}