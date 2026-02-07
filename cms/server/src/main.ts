import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Global prefix
  const apiPrefix = configService.get<string>("API_PREFIX", "api");
  app.setGlobalPrefix(apiPrefix);

  // CORS
  const corsOrigins = configService.get<string>(
    "CORS_ORIGINS",
    "http://localhost:3000,http://localhost:3001",
  );
  app.enableCors({
    origin: corsOrigins.split(",").map((origin) => origin.trim()),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger API Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle("UtterLore CMS API")
    .setDescription("Generic CMS API for managing pages, content, and media")
    .setVersion("1.0")
    .addTag("Pages", "Page content management")
    .addTag("Schemas", "Page schema definitions")
    .addTag("Media", "Media file management")
    .addTag("Settings", "CMS settings")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document);

  // Start server
  const port = configService.get<number>("PORT", 3002);
  await app.listen(port);

  console.log(`
🚀 UtterLore CMS API is running!
📍 API: http://localhost:${port}/${apiPrefix}
📚 Swagger Docs: http://localhost:${port}/docs
  `);
}

bootstrap();
