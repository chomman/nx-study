import { INestApplication } from '@nestjs/common';
import AdminBro from 'admin-bro';
import { Database, Resource } from 'admin-bro-typeorm';
import * as AdminBroExpress from 'admin-bro-expressjs';
import * as AdminBroSequelize from '@admin-bro/sequelize';
import UserResource from './resources/user.resource';
import TodoResource from './resources/todo.resource';
import PostResource from './resources/post.resource';

export async function setupAdminPanel(app: INestApplication): Promise<void> {

    AdminBro.registerAdapter({ Database, Resource });
    AdminBro.registerAdapter(AdminBroSequelize);

    const adminBro = new AdminBro({
        resources: [UserResource, TodoResource, PostResource],
        rootPath: '/admin'
    });

    const router = AdminBroExpress.buildRouter(adminBro);

    app.use(adminBro.options.rootPath, router);
}