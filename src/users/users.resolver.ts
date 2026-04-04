import { Resolver, Query, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Order } from '../orders/entities/order.entity';
import { OrdersService } from '../orders/orders.service'; 

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService, 
  ) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @ResolveField(() => [Order])
  async orders(@Parent() user: User) {
    const { id } = user;
    return this.ordersService.findAllByUser(id); 
  }
}