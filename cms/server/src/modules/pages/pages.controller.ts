import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
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
import { PagesService } from "./pages.service";
import {
  CreatePageDto,
  UpdatePageDto,
  UpdateSectionDto,
  PageResponseDto,
} from "../../common/dto";

@ApiTags("Pages")
@Controller("pages")
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  // ============================================
  // PAGE ENDPOINTS
  // ============================================

  @Get()
  @ApiOperation({ summary: "Get all pages" })
  @ApiResponse({
    status: 200,
    description: "List of all pages",
    type: [PageResponseDto],
  })
  async findAll() {
    return this.pagesService.findAll();
  }

  @Get("by-slug")
  @ApiOperation({ summary: "Get page by slug" })
  @ApiQuery({ name: "slug", description: "Page URL slug", example: "/about" })
  @ApiResponse({
    status: 200,
    description: "Page content",
    type: PageResponseDto,
  })
  @ApiResponse({ status: 404, description: "Page not found" })
  async findBySlug(@Query("slug") slug: string) {
    const page = await this.pagesService.findBySlug(slug);
    if (!page) {
      throw new HttpException("Page not found", HttpStatus.NOT_FOUND);
    }
    return page;
  }

  @Get(":id")
  @ApiOperation({ summary: "Get page by ID" })
  @ApiParam({ name: "id", description: "Page ID" })
  @ApiResponse({
    status: 200,
    description: "Page content",
    type: PageResponseDto,
  })
  @ApiResponse({ status: 404, description: "Page not found" })
  async findOne(@Param("id") id: string) {
    const page = await this.pagesService.findOne(id);
    if (!page) {
      throw new HttpException("Page not found", HttpStatus.NOT_FOUND);
    }
    return page;
  }

  @Post()
  @ApiOperation({ summary: "Create a new page" })
  @ApiResponse({
    status: 201,
    description: "Page created",
    type: PageResponseDto,
  })
  async create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a page (full update)" })
  @ApiParam({ name: "id", description: "Page ID" })
  @ApiResponse({
    status: 200,
    description: "Page updated",
    type: PageResponseDto,
  })
  @ApiResponse({ status: 404, description: "Page not found" })
  async update(@Param("id") id: string, @Body() updatePageDto: UpdatePageDto) {
    const page = await this.pagesService.update(id, updatePageDto);
    if (!page) {
      throw new HttpException("Page not found", HttpStatus.NOT_FOUND);
    }
    return page;
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a page" })
  @ApiParam({ name: "id", description: "Page ID" })
  @ApiResponse({ status: 200, description: "Page deleted" })
  @ApiResponse({ status: 404, description: "Page not found" })
  async delete(@Param("id") id: string) {
    const deleted = await this.pagesService.delete(id);
    if (!deleted) {
      throw new HttpException("Page not found", HttpStatus.NOT_FOUND);
    }
    return { message: "Page deleted successfully" };
  }

  // ============================================
  // SECTION ENDPOINTS
  // ============================================

  @Get(":pageId/sections/:sectionId")
  @ApiOperation({ summary: "Get a specific section from a page" })
  @ApiParam({ name: "pageId", description: "Page ID" })
  @ApiParam({ name: "sectionId", description: "Section ID" })
  @ApiResponse({ status: 200, description: "Section content" })
  @ApiResponse({ status: 404, description: "Section not found" })
  async findSection(
    @Param("pageId") pageId: string,
    @Param("sectionId") sectionId: string,
  ) {
    const section = await this.pagesService.findSection(pageId, sectionId);
    if (!section) {
      throw new HttpException("Section not found", HttpStatus.NOT_FOUND);
    }
    return section;
  }

  @Patch(":pageId/sections/:sectionId")
  @ApiOperation({ summary: "Update a specific section" })
  @ApiParam({ name: "pageId", description: "Page ID" })
  @ApiParam({ name: "sectionId", description: "Section ID" })
  @ApiResponse({ status: 200, description: "Section updated" })
  @ApiResponse({ status: 404, description: "Section not found" })
  async updateSection(
    @Param("pageId") pageId: string,
    @Param("sectionId") sectionId: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    const section = await this.pagesService.updateSection(
      pageId,
      sectionId,
      updateSectionDto,
    );
    if (!section) {
      throw new HttpException("Section not found", HttpStatus.NOT_FOUND);
    }
    return section;
  }

  @Put(":pageId/sections/reorder")
  @ApiOperation({ summary: "Reorder sections within a page" })
  @ApiParam({ name: "pageId", description: "Page ID" })
  @ApiResponse({ status: 200, description: "Sections reordered" })
  @ApiResponse({ status: 404, description: "Page not found" })
  async reorderSections(
    @Param("pageId") pageId: string,
    @Body() body: { sectionIds: string[] },
  ) {
    const success = await this.pagesService.reorderSections(
      pageId,
      body.sectionIds,
    );
    if (!success) {
      throw new HttpException("Page not found", HttpStatus.NOT_FOUND);
    }
    return { message: "Sections reordered successfully" };
  }
}
