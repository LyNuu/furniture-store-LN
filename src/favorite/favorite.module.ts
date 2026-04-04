import { Module } from '@nestjs/common';
import { FavoritesService } from './favorite.service';
import { FavoritesController } from './favorite.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaService],
})
export class FavoritesModule {}