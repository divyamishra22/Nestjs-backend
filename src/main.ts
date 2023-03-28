import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(), {
      cors: {
        origin: [
          'http://ec2-13-51-249-139.eu-north-1.compute.amazonaws.com/'
         
        ],
      },
    }
  );
  const config = new DocumentBuilder()
    .setTitle('Moo API')
    .setDescription('API for checking user status')
    .setVersion('1.0')
    .addTag('posts')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
