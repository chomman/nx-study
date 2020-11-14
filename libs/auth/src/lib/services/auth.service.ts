import * as bcrypt  from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User, UserService } from '@nx-study/model-typeorm';
import TokenResponse from '../interfaces/token-response.interface';

@Injectable()
/** @class */
export class AuthService {
    /**
     * Authentication service.
     * @param {JwtService} jwtService @nestjs/jwt service
     * @param {UserService} userService UserService
     * @param {ConfigService} configService ConfigService
     */
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly configService: ConfigService
    ) {
        //
    }

    /**
     * Validates user's password.
     * @param {String} email
     * @param {String} password
     * @returns {Promise<User>} Promise<User>
     */
    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email);
        return user && await bcrypt.compare(password, user.password) && user;
    }

    /**
     * Login authhentication.
     * @param {User} user User entity
     * @return {TokenResponse}
     */
    async login(user: User): Promise<TokenResponse> {
        return this.tokenMeta(await this.jwtService.sign({ sub: user.id, }))
    }

    /**
     * Formats token response.
     * @param {String} token Token
     * @returns {TokenResponse}
     */
    tokenMeta(token: string): TokenResponse {
        return {
            type: 'bearer',
            token,
            expiresIn: this.configService.get('app.jwt.expiresIn'),
            validFor: this.configService.get('app.jwt.maxAge'),
        };
    }
}
