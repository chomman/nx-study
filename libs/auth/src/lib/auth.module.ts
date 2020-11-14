import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ModelTypeOrmModule } from '@nx-study/model-typeorm';
import { LocalStrategy, JwtStrategy, TokenRefreshStrategy } from './strategies';
import { AuthService } from './services';
import { LoginController, ProfileController, RegisterController } from './controllers';
import { PassportModule } from '@nestjs/passport';
import { UtilsModule } from "@nx-study/utils";

@Module({
    imports: [
      ModelTypeOrmModule,
      JwtModule.registerAsync({
          useFactory: (configService: ConfigService) => ({
              secret: configService.get('app.jwt.key'),
              signOptions: {
                  expiresIn: configService.get('app.jwt.expiresIn'),
                  issuer: configService.get('app.url'),
              }
          }),
          inject: [ConfigService],
      }),
      PassportModule,
      UtilsModule
    ],
    controllers: [
        LoginController, 
        RegisterController,
        ProfileController
    ],
    providers: [
        AuthService, 
        LocalStrategy, 
        JwtStrategy, 
        TokenRefreshStrategy
    ]
})
export class AuthModule {}
