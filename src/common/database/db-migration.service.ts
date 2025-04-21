import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { config, database, up } from "migrate-mongo";

@Injectable()
export class DbMigrationService implements OnModuleInit {
  private readonly dbMigrationConfig: Partial<config.Config> = {
    mongodb: {
      databaseName: this.configService.get<string>("DATABASE_NAME"),
      url: this.configService.get<string>("DATABASE_URL"),
    },
    migrationsDir: `${__dirname}/../../migrations`,
    changelogCollectionName: "changelog",
    // The 'changelog' collection stores migration records.
    // When the application starts, it checks this collection
    // to determine whether a migration should be run or not.
    migrationFileExtension: ".js",
    //migrationFileExtension is the file extension of the migration files.
    // The default is .js, but you can change it to .ts if you want to use TypeScript.
    // The migration files are stored in the migrationsDir directory.
  };
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    config.set(this.dbMigrationConfig);
    // The config.set() method sets the configuration for the migration.
    const { db, client } = await database.connect();
    // The database.connect() method connects to the MongoDB database
    await up(db, client); // run script from migrations folder
    // The up function runs the migrations that have not been run yet.
  }
}
