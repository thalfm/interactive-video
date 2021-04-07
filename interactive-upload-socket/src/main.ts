import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// import {join} from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
  await app.listen(process.env.APP_PORT);
}
bootstrap();


//Para arquivos estáticos
// async function bootstrap() {
//   // const app = await NestFactory.create(AppModule);
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);
//   app.useStaticAssets(join(__dirname, '..', 'static'));
//   await app.listen(3003).then(() => console.log('Listening on http://localhost:3003'));
// }
// bootstrap();