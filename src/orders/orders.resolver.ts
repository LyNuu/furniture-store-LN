import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [Order], { name: 'userOrders' })
  async findByUser(@Args('userId', { type: () => ID }) userId: string) {
    return this.ordersService.findAllByUser(userId);
  }

  @Query(() => Order, { name: 'order' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.ordersService.findOne(id);
  }
}