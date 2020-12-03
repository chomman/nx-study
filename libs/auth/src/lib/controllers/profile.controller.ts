import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Controller, Req, UseGuards, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { User, UserResponse } from '@nx-study/model-typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('profile')
@ApiTags('me')
export class ProfileController {
    @UseGuards(AuthGuard('bearer-authentication'))
    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBearerAuth()
    profile(@Req() req: Request): UserResponse {
        return { data: plainToClass(User, req.user) };
    }
}
