import { IsEmail } from 'class-validator';

export class CreateSubscriberDto {
  @IsEmail({}, { message: 'Некорректный формат email' })
  email: string;
}