import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    default: process.env.DB_CLIENT || 'mysql',

    connections: {
        mysql: {
            host: process.env.DB_HOST || '127.0.0.1',
            port: parseInt(process.env.DB_PORT) || 3306,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME || 'app',
            insecureAuth: false,
            synchronize: true,
        },
        sqlite: {
            database: process.env.SQLITE_DATABASE,
            synchronize: true,
        }
    }
}));
