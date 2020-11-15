import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import app from './app';
import database from './database';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          load: [database, app],
          envFilePath: process.env.NODE_ENV_FILE_PATH || '.env'
      }),
  ],
  exports: [ConfigModule]
})
export class ConfigurationModule {
  constructor() {
    console.log('process.env', process.env);
  }
}
