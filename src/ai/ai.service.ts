import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import axios, { AxiosError } from 'axios';

@Injectable()
export class AiService {
  constructor(private prisma: PrismaService) { }

  async chat(userId: string, content: string) {
    try {
      await this.prisma.aiMessage.create({
        data: {
          content,
          role: 'user',
          userId: userId,
        },
      });

      const lastMessages = await this.prisma.aiMessage.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' },
        take: 10,
      });

      const context = lastMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'nvidia/nemotron-3-super-120b-a12b:free',
          messages: [
            {
              role: 'system',
              content: 'Ты — эксперт-консультант магазина мебели LYNUU. Твоя цель — помогать пользователю выбирать мебель (диваны, столы, кровати). Пиши на русском, будь вежливым и лаконичным.',
            },
            ...context,
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'X-Title': 'LYNUU Furniture Store',
          },
        },
      );

      const aiResponseContent = response.data.choices[0].message.content;

      const savedAiMsg = await this.prisma.aiMessage.create({
        data: {
          content: aiResponseContent,
          role: 'assistant',
          userId: userId,
        },
      });

      return savedAiMsg;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('OpenRouter Error:', axiosError?.response?.data || axiosError?.message || String(error));
      throw new InternalServerErrorException('Ошибка при общении с AI');
    }
  }

  async getHistory(userId: string) {
    return this.prisma.aiMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      take: 50,
    });
  }
}