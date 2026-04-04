import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './dto/login.input';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(input: LoginInput) {
    const candidate = await this.usersService.findByEmail(input.email);
    if (candidate) throw new BadRequestException('Пользователь с таким email уже существует');

    const user = await this.usersService.create({
      email: input.email,
      password: input.password, 
      role: Role.USER,
    });

    return this.generateToken(user);
  }

  async login(input: LoginInput) {
    const user = await this.usersService.findByEmail(input.email);
    if (!user) throw new UnauthorizedException('Неверные данные');

    const isMatch = await bcrypt.compare(input.password, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException('Неверные данные');

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}