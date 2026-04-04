import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guard'; 
import { Roles } from './decorators/roles.decorator';
import { Role } from '@prisma/client';
import type { Request } from 'express'; 

@Controller('auth') 
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupInput: LoginInput) {
    return this.authService.signup(signupInput);
  }

  @Post('login')
  async login(@Body() loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'), RolesGuard) 
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('admin-only')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  adminOnlyData() {
    return { message: 'Привет, админ! Это секретные данные.' };
  }
}