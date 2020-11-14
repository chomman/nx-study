import { Module, DynamicModule } from '@nestjs/common';
//import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from '@nx-study/config';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces/config-module-options.interface'
import { DatabaseOptions } from './database/options';

@Module({})
export class BootstrapModule {
    static forRoot<T extends DatabaseOptions & ConfigModuleOptions>(options: T): DynamicModule {
        return {
            module: BootstrapModule,
            imports: [
                //DatabaseModule.forRoot(options), 
                ConfigurationModule
            ]
        };
    }
}
