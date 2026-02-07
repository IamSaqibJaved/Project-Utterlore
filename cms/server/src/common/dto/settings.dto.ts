import { IsString, IsOptional, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CMSSettingsDto {
  @ApiProperty({ description: "Site name" })
  @IsString()
  siteName: string;

  @ApiPropertyOptional({ description: "Site description" })
  @IsOptional()
  @IsString()
  siteDescription?: string;

  @ApiPropertyOptional({ description: "Logo URL" })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiPropertyOptional({ description: "Favicon URL" })
  @IsOptional()
  @IsString()
  favicon?: string;

  @ApiProperty({
    enum: ["light", "dark", "system"],
    description: "Theme preference",
  })
  @IsEnum(["light", "dark", "system"])
  theme: "light" | "dark" | "system";

  @ApiProperty({ description: "Language code" })
  @IsString()
  language: string;

  @ApiProperty({ description: "Timezone" })
  @IsString()
  timezone: string;
}

export class UpdateSettingsDto {
  @ApiPropertyOptional({ description: "Site name" })
  @IsOptional()
  @IsString()
  siteName?: string;

  @ApiPropertyOptional({ description: "Site description" })
  @IsOptional()
  @IsString()
  siteDescription?: string;

  @ApiPropertyOptional({ description: "Logo URL" })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiPropertyOptional({ description: "Favicon URL" })
  @IsOptional()
  @IsString()
  favicon?: string;

  @ApiPropertyOptional({
    enum: ["light", "dark", "system"],
    description: "Theme preference",
  })
  @IsOptional()
  @IsEnum(["light", "dark", "system"])
  theme?: "light" | "dark" | "system";

  @ApiPropertyOptional({ description: "Language code" })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({ description: "Timezone" })
  @IsOptional()
  @IsString()
  timezone?: string;
}
