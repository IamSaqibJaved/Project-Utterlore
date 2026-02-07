import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsArray,
  IsObject,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

// ============================================
// SECTION CONTENT DTO
// ============================================

export class SectionContentDto {
  @ApiProperty({ description: "Section ID matching schema section" })
  @IsString()
  id: string;

  @ApiProperty({ description: "Whether section is enabled" })
  @IsBoolean()
  enabled: boolean;

  @ApiProperty({ description: "Display order of section" })
  @IsNumber()
  order: number;

  @ApiProperty({ description: "Section data as key-value pairs" })
  @IsObject()
  data: Record<string, unknown>;
}

// ============================================
// PAGE METADATA DTO
// ============================================

export class PageMetadataDto {
  @ApiPropertyOptional({ description: "SEO Title" })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: "SEO Description" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: "Last modified timestamp" })
  @IsString()
  lastModified: string;

  @ApiPropertyOptional({ description: "User who last modified" })
  @IsOptional()
  @IsString()
  modifiedBy?: string;
}

// ============================================
// CREATE PAGE DTO
// ============================================

export class CreatePageDto {
  @ApiProperty({ description: "Page schema ID this content belongs to" })
  @IsString()
  pageSchemaId: string;

  @ApiProperty({ description: "URL slug for the page" })
  @IsString()
  slug: string;

  @ApiProperty({
    description: "Array of section contents",
    type: [SectionContentDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionContentDto)
  sections: SectionContentDto[];

  @ApiPropertyOptional({ description: "Page metadata" })
  @IsOptional()
  @ValidateNested()
  @Type(() => PageMetadataDto)
  metadata?: Partial<PageMetadataDto>;
}

// ============================================
// UPDATE PAGE DTO
// ============================================

export class UpdatePageDto {
  @ApiPropertyOptional({ description: "URL slug for the page" })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({
    description: "Array of section contents",
    type: [SectionContentDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionContentDto)
  sections?: SectionContentDto[];

  @ApiPropertyOptional({ description: "Page metadata" })
  @IsOptional()
  @ValidateNested()
  @Type(() => PageMetadataDto)
  metadata?: Partial<PageMetadataDto>;
}

// ============================================
// UPDATE SECTION DTO
// ============================================

export class UpdateSectionDto {
  @ApiPropertyOptional({ description: "Whether section is enabled" })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @ApiPropertyOptional({ description: "Display order of section" })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiPropertyOptional({ description: "Section data as key-value pairs" })
  @IsOptional()
  @IsObject()
  data?: Record<string, unknown>;
}

// ============================================
// PAGE RESPONSE DTO
// ============================================

export class PageResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  pageSchemaId: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({ type: [SectionContentDto] })
  sections: SectionContentDto[];

  @ApiProperty()
  metadata: PageMetadataDto;
}
