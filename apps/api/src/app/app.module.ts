import { Module } from '@nestjs/common';
import { ModelTypeOrmModule } from '@nx-study/model-typeorm';
import { ModelSequelizeModule } from '@nx-study/model-sequelize';
import { AuthModule } from '@nx-study/auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BootstrapModule } from './bootstrap/bootstrap.module';

@Module({
  imports: [
    ModelTypeOrmModule,
    ModelSequelizeModule,
    BootstrapModule.forRoot({ autoLoadEntities: true }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
