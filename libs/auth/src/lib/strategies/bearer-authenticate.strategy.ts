import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserService } from '@nx-study/model-typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'bearer-authentication') {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('app.jwt.key'),
            jsonWebTokenOptions: {
                maxAge: configService.get('app.jwt.maxAge')
            }
        });
    }

    async validate(payload: { id: string }): Promise<User> {
        return await this.userService.findById(payload.id);
    }
}
