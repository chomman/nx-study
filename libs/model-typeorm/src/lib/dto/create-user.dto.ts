import { IUser } from '@nx-study/data';
import { IsString, IsNotEmpty, IsEmail, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto implements IUser {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly lastName: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(8)
    @ApiProperty()
    readonly password: string
}
