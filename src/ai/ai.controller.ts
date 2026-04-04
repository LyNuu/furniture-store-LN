import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('ai')
@UseGuards(AuthGuard('jwt'))
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Req() req: any, @Body('content') content: string) {
    return this.aiService.chat(req.user.id, content);
  }

  @Get('history')
  async getHistory(@Req() req: any) {
    return this.aiService.getHistory(req.user.id);
  }
}