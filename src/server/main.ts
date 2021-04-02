import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as session from "express-session";
import * as passport from "passport";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
const redis = require('redis')

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalPipes(new ValidationPipe())
    //app.setGlobalPrefix('api')
    let RedisStore = require('connect-redis')(session)
    let redisClient = redis.createClient()

    app.use(
        session({
            store: new RedisStore({client: redisClient}),
            secret: 'nest cats',
            resave: false,
            saveUninitialized: false,
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    const config = new DocumentBuilder()
        .setTitle('SharkServersReborn')
        .setDescription('The SharkServersReborn API description')
        .setVersion('1.0')
        .addTag('SharkServersReborn')
        .build();
    // @ts-ignore
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, document);

    await app.listen(3000);
}

bootstrap();
