import {
    TypeOrmModuleOptions,
    TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm'

export type DatabaseOptions = TypeOrmModuleAsyncOptions & TypeOrmModuleOptions;
