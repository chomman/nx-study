import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { setupAdminPanel } from './admin-panel/admin-panel.plugin';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(helmet());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  const options = new DocumentBuilder()
    .setTitle('nx-study')
    .setDescription('NX-Study API Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Nestjs Swagger UI')
    .setLicense('MIT', '')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await setupAdminPanel(app);

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`, 'HTTP');
    Logger.log('Press Ctrl+C to quit.', 'HTTP');
  });
}

bootstrap().catch((err) => {
  process.exitCode = 1;
  Logger.error(err);
});
