import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Logger } from "nestjs-pino";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useLogger(app.get(Logger));
  //Pino logger, It will allow us to add correlation keys to each log and make logging more structured.

  app.use(cookieParser());
  await app.listen(app.get(ConfigService).getOrThrow("BACKEND_PORT"));
}
bootstrap();
