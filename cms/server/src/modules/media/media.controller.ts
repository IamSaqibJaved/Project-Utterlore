import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from "@nestjs/swagger";
import { MediaService } from "./media.service";
import {
  UpdateMediaDto,
  CreateFolderDto,
  MediaFileDto,
} from "../../common/dto";

@ApiTags("Media")
@Controller("media")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // ============================================
  // FILE ENDPOINTS
  // ============================================

  @Get()
  @ApiOperation({ summary: "Get all media files" })
  @ApiQuery({
    name: "folder",
    required: false,
    description: "Filter by folder",
  })
  @ApiResponse({
    status: 200,
    description: "List of media files",
    type: [MediaFileDto],
  })
  async findAll(@Query("folder") folder?: string) {
    return this.mediaService.findAll(folder);
  }

  @Get("stats")
  @ApiOperation({ summary: "Get media library statistics" })
  @ApiResponse({ status: 200, description: "Media statistics" })
  async getStats() {
    return this.mediaService.getStats();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get media file by ID" })
  @ApiParam({ name: "id", description: "Media file ID" })
  @ApiResponse({ status: 200, description: "Media file", type: MediaFileDto })
  @ApiResponse({ status: 404, description: "File not found" })
  async findOne(@Param("id") id: string) {
    const file = await this.mediaService.findOne(id);
    if (!file) {
      throw new HttpException("File not found", HttpStatus.NOT_FOUND);
    }
    return file;
  }

  @Post("upload")
  @ApiOperation({ summary: "Upload a single file" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
        folder: { type: "string" },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "File uploaded",
    type: MediaFileDto,
  })
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body("folder") folder?: string,
  ) {
    if (!file) {
      throw new HttpException("No file provided", HttpStatus.BAD_REQUEST);
    }
    return this.mediaService.upload(file, folder);
  }

  @Post("upload/multiple")
  @ApiOperation({ summary: "Upload multiple files" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        files: { type: "array", items: { type: "string", format: "binary" } },
        folder: { type: "string" },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Files uploaded",
    type: [MediaFileDto],
  })
  @UseInterceptors(FilesInterceptor("files", 10))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body("folder") folder?: string,
  ) {
    if (!files || files.length === 0) {
      throw new HttpException("No files provided", HttpStatus.BAD_REQUEST);
    }

    const uploaded = await Promise.all(
      files.map((file) => this.mediaService.upload(file, folder)),
    );
    return uploaded;
  }

  @Put(":id")
  @ApiOperation({ summary: "Update media file metadata" })
  @ApiParam({ name: "id", description: "Media file ID" })
  @ApiResponse({ status: 200, description: "File updated", type: MediaFileDto })
  @ApiResponse({ status: 404, description: "File not found" })
  async update(@Param("id") id: string, @Body() updateDto: UpdateMediaDto) {
    const file = await this.mediaService.update(id, updateDto);
    if (!file) {
      throw new HttpException("File not found", HttpStatus.NOT_FOUND);
    }
    return file;
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a media file" })
  @ApiParam({ name: "id", description: "Media file ID" })
  @ApiResponse({ status: 200, description: "File deleted" })
  @ApiResponse({ status: 404, description: "File not found" })
  async delete(@Param("id") id: string) {
    const deleted = await this.mediaService.delete(id);
    if (!deleted) {
      throw new HttpException("File not found", HttpStatus.NOT_FOUND);
    }
    return { message: "File deleted successfully" };
  }

  @Delete()
  @ApiOperation({ summary: "Delete multiple media files" })
  @ApiResponse({ status: 200, description: "Files deleted" })
  async deleteMany(@Body() body: { ids: string[] }) {
    const count = await this.mediaService.deleteMany(body.ids);
    return { message: `${count} file(s) deleted successfully` };
  }

  // ============================================
  // FOLDER ENDPOINTS
  // ============================================

  @Get("folders/list")
  @ApiOperation({ summary: "Get all folders" })
  @ApiResponse({ status: 200, description: "List of folders" })
  async getFolders() {
    return this.mediaService.getFolders();
  }

  @Post("folders")
  @ApiOperation({ summary: "Create a new folder" })
  @ApiResponse({ status: 201, description: "Folder created" })
  async createFolder(@Body() createFolderDto: CreateFolderDto) {
    const folder = await this.mediaService.createFolder(
      createFolderDto.name,
      createFolderDto.parent,
    );
    return { path: folder };
  }

  @Delete("folders/:path")
  @ApiOperation({ summary: "Delete a folder and its contents" })
  @ApiParam({ name: "path", description: "Folder path" })
  @ApiResponse({ status: 200, description: "Folder deleted" })
  async deleteFolder(@Param("path") path: string) {
    const deleted = await this.mediaService.deleteFolder(path);
    if (!deleted) {
      throw new HttpException("Folder not found", HttpStatus.NOT_FOUND);
    }
    return { message: "Folder deleted successfully" };
  }
}
