import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// import { UsersModule } from "./users/users.module";
import { LoggerModule } from "nestjs-pino";
import * as Joi from "joi";
import { DatabaseModule } from "./common/database/database.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        BACKEND_PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default("3600"),
      }),
    }),
    LoggerModule.forRootAsync({
      // imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get("NODE_ENV") === "production";
        return {
          pinoHttp: {
            transport: isProduction
              ? undefined
              : {
                  target: "pino-pretty",
                  options: {
                    singleLine: true,
                  },
                },
            level: isProduction ? "info" : "debug",
          },
        };
      },
      inject: [ConfigService],
    }),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      debug: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
