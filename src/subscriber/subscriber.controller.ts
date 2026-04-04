import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { NewsletterService } from './subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  async subscribe(@Body() createSubscriberDto: CreateSubscriberDto) {
    return await this.newsletterService.subscribe(createSubscriberDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async findAll() {
    return await this.newsletterService.findAll();
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.newsletterService.remove(id);
  }
}