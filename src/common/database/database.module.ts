import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get("DATABASE_URL"),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {
  //this module is responsible for connecting to the MongoDB database using Mongoose.

  static forFeature(models: ModelDefinition[]) {
    //forFeature method is a static method that allows you to register Mongoose models in the module.
    //It takes an array of ModelDefinition objects as an argument.

    return MongooseModule.forFeature(models);
    //MongooseModule.forFeature method is used to register the models with Mongoose.
    //It returns a dynamic module that can be imported into other modules.
  }
}
