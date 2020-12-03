import { Request } from 'express';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Post, Req, UseGuards, HttpCode, HttpStatus, All } from '@nestjs/common';
import TokenResponse from '../interfaces/token-response.interface';
import { User } from '@nx-study/model-typeorm';
import { AuthService } from '../services';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class LoginController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiQuery({ name: 'email' })
    @ApiQuery({ name: 'password' })
    @HttpCode(HttpStatus.OK)
    async login(@Req() req: Request): Promise<any> {
        return this.authService.login(plainToClass(User, req.user));
    }


    @UseGuards(AuthGuard('bearer-refresh'))
    @All('token/refresh')
    @HttpCode(HttpStatus.OK)
    async refreshToken(@Req() req: Request): Promise<TokenResponse> {
        return this.authService.login(plainToClass(User, req.user));
    }
}
