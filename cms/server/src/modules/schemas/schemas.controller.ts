import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";
import { SchemasService } from "./schemas.service";
import { PageSchema, SectionSchema } from "../../common/types";

@ApiTags("Schemas")
@Controller("schemas")
export class SchemasController {
  constructor(private readonly schemasService: SchemasService) {}

  @Get()
  @ApiOperation({ summary: "Get all page schemas" })
  @ApiResponse({ status: 200, description: "List of all page schemas" })
  async findAll() {
    return this.schemasService.findAll();
  }

  @Get("by-slug")
  @ApiOperation({ summary: "Get schema by page slug" })
  @ApiQuery({ name: "slug", description: "Page URL slug", example: "/about" })
  @ApiResponse({ status: 200, description: "Page schema" })
  @ApiResponse({ status: 404, description: "Schema not found" })
  async findBySlug(@Query("slug") slug: string) {
    const schema = await this.schemasService.findBySlug(slug);
    if (!schema) {
      throw new HttpException("Schema not found", HttpStatus.NOT_FOUND);
    }
    return schema;
  }

  @Get(":id")
  @ApiOperation({ summary: "Get schema by ID" })
  @ApiParam({ name: "id", description: "Schema ID" })
  @ApiResponse({ status: 200, description: "Page schema" })
  @ApiResponse({ status: 404, description: "Schema not found" })
  async findOne(@Param("id") id: string) {
    const schema = await this.schemasService.findOne(id);
    if (!schema) {
      throw new HttpException("Schema not found", HttpStatus.NOT_FOUND);
    }
    return schema;
  }

  @Post()
  @ApiOperation({ summary: "Create a new schema" })
  @ApiResponse({ status: 201, description: "Schema created" })
  async create(@Body() schema: PageSchema) {
    return this.schemasService.create(schema);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a schema" })
  @ApiParam({ name: "id", description: "Schema ID" })
  @ApiResponse({ status: 200, description: "Schema updated" })
  @ApiResponse({ status: 404, description: "Schema not found" })
  async update(@Param("id") id: string, @Body() updates: Partial<PageSchema>) {
    const schema = await this.schemasService.update(id, updates);
    if (!schema) {
      throw new HttpException("Schema not found", HttpStatus.NOT_FOUND);
    }
    return schema;
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a schema" })
  @ApiParam({ name: "id", description: "Schema ID" })
  @ApiResponse({ status: 200, description: "Schema deleted" })
  @ApiResponse({ status: 404, description: "Schema not found" })
  async delete(@Param("id") id: string) {
    const deleted = await this.schemasService.delete(id);
    if (!deleted) {
      throw new HttpException("Schema not found", HttpStatus.NOT_FOUND);
    }
    return { message: "Schema deleted successfully" };
  }

  // ============================================
  // SECTION ENDPOINTS
  // ============================================

  @Get(":schemaId/sections/:sectionId")
  @ApiOperation({ summary: "Get a specific section from a schema" })
  @ApiParam({ name: "schemaId", description: "Schema ID" })
  @ApiParam({ name: "sectionId", description: "Section ID" })
  @ApiResponse({ status: 200, description: "Section schema" })
  @ApiResponse({ status: 404, description: "Section not found" })
  async findSection(
    @Param("schemaId") schemaId: string,
    @Param("sectionId") sectionId: string,
  ) {
    const section = await this.schemasService.findSection(schemaId, sectionId);
    if (!section) {
      throw new HttpException("Section not found", HttpStatus.NOT_FOUND);
    }
    return section;
  }

  @Put(":schemaId/sections/:sectionId")
  @ApiOperation({ summary: "Update a section schema" })
  @ApiParam({ name: "schemaId", description: "Schema ID" })
  @ApiParam({ name: "sectionId", description: "Section ID" })
  @ApiResponse({ status: 200, description: "Section updated" })
  @ApiResponse({ status: 404, description: "Section not found" })
  async updateSection(
    @Param("schemaId") schemaId: string,
    @Param("sectionId") sectionId: string,
    @Body() updates: Partial<SectionSchema>,
  ) {
    const section = await this.schemasService.updateSection(
      schemaId,
      sectionId,
      updates,
    );
    if (!section) {
      throw new HttpException("Section not found", HttpStatus.NOT_FOUND);
    }
    return section;
  }
}
