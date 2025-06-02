import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { config } from 'dotenv';
import { load } from 'js-yaml';

config();

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiLink = resolve(__dirname, '..', 'doc', 'api.yaml');
  const doc = await readFile(apiLink, 'utf8');
  SwaggerModule.setup('doc', app, load(doc) as OpenAPIObject);
  await app.listen(PORT);
  console.log(`App running on http://localhost:${PORT}!`)
  console.log(`API is available on http://localhost:${PORT}/doc`)
}
bootstrap();
