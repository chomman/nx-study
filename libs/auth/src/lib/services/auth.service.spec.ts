import { plainToClass } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserService } from '@nx-study/model-typeorm';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let userService: Partial<UserService> = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, UserService, ConfigService,
                {
                    provide: getRepositoryToken(User),
                    useValue: { findOne() { return { email:'test@example.org', password: '' }; } }
                }
            ],
            imports: [JwtModule]
        })
            .overrideProvider(JwtService)
            .useValue({ sign() { return ''; }})
            .compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should validate user', async () => {
        expect(await service.validateUser('test@example.org', '')).not.toBeTruthy();
    });

    it('should login user and return authentication data', async () => {
        expect(await service.login(plainToClass(User, { email: 'test@example.org', password: '' })))
            .toEqual(expect.objectContaining({ type: expect.any(String), token: expect.any(String) }));
    });
});
