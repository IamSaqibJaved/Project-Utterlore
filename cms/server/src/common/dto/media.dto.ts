import { IsString, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class MediaFileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  originalName: string;

  @ApiProperty()
  mimeType: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  url: string;

  @ApiPropertyOptional()
  alt?: string;

  @ApiPropertyOptional()
  caption?: string;

  @ApiPropertyOptional()
  folder?: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}

export class UpdateMediaDto {
  @ApiPropertyOptional({ description: "Alt text for accessibility" })
  @IsOptional()
  @IsString()
  alt?: string;

  @ApiPropertyOptional({ description: "Caption for the media" })
  @IsOptional()
  @IsString()
  caption?: string;

  @ApiPropertyOptional({ description: "Folder path" })
  @IsOptional()
  @IsString()
  folder?: string;
}

export class CreateFolderDto {
  @ApiProperty({ description: "Folder name" })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: "Parent folder path" })
  @IsOptional()
  @IsString()
  parent?: string;
}
