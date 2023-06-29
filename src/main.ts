import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from 'process';

async function bootstrap() {
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter(), {
  //     cors: {
  //       origin: [
  //         'http://ec2-13-51-249-139.eu-north-1.compute.amazonaws.com/'
         
  //       ],
  //     },
  //   }
  // );
  const app = await NestFactory.create<NestExpressApplication>(AppModule, 
    {
          // cors: {
          //   origin: [
          //     'http://ec2-13-51-249-139.eu-north-1.compute.amazonaws.com/'
             
          //   ],
          // },
        } 
    );
  // app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Moo API')
    .setDescription('API for checking user status')
    .setVersion('1.0')
    .addTag('posts')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.HOST || 3000);
}
bootstrap();
