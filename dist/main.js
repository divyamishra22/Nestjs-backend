"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter(), {
        cors: {
            origin: [
                'http://ec2-13-51-249-139.eu-north-1.compute.amazonaws.com/'
            ],
        },
    });
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Moo API')
        .setDescription('API for checking user status')
        .setVersion('1.0')
        .addTag('posts')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map