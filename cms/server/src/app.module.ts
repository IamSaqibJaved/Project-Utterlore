import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

import { PrismaModule } from "./prisma";
import { PagesModule } from "./modules/pages";
import { SchemasModule } from "./modules/schemas";
import { MediaModule } from "./modules/media";
import { SettingsModule } from "./modules/settings";

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),

    // Database
    PrismaModule,

    // Serve uploaded files statically
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads",
    }),

    // Feature modules
    PagesModule,
    SchemasModule,
    MediaModule,
    SettingsModule,
  ],
})
export class AppModule {}
