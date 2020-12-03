import { plainToClass } from 'class-transformer';
import { Controller, UseInterceptors, ClassSerializerInterceptor, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { User, UserService, CreateUserDto, UserResponse } from '@nx-study/model-typeorm';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class RegisterController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    //@ApiBody({ type: CreateUserDto })
    async create(@Body() body: CreateUserDto): Promise<UserResponse> {
        const user = this.userService.create(body);

        if (await this.userService.findByEmail(body.email)) {
            throw new HttpException({ message: 'User already exists.' }, HttpStatus.BAD_REQUEST);
        }

        return plainToClass(UserResponse, {
            message: 'User created',
            data: await this.userService.save(user)
        });
    }
}
