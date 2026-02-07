import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { MediaFile } from "../../common/types";
import { UpdateMediaDto } from "../../common/dto";

@Injectable()
export class MediaService {
  // In-memory storage for media files
  private files: Map<string, MediaFile> = new Map();
  private folders: Set<string> = new Set(["images", "videos", "documents"]);

  // ============================================
  // FILE OPERATIONS
  // ============================================

  async findAll(folder?: string): Promise<MediaFile[]> {
    const files = Array.from(this.files.values());
    if (folder) {
      return files.filter((f) => f.folder === folder);
    }
    return files;
  }

  async findOne(id: string): Promise<MediaFile | null> {
    return this.files.get(id) || null;
  }

  async upload(file: Express.Multer.File, folder?: string): Promise<MediaFile> {
    const id = uuidv4();
    const now = new Date().toISOString();
    const filename = `${id}-${file.originalname}`;

    const mediaFile: MediaFile = {
      id,
      filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url: `/uploads/${folder || "images"}/${filename}`,
      folder: folder || "images",
      createdAt: now,
      updatedAt: now,
    };

    this.files.set(id, mediaFile);
    return mediaFile;
  }

  async update(
    id: string,
    updateDto: UpdateMediaDto,
  ): Promise<MediaFile | null> {
    const file = this.files.get(id);
    if (!file) return null;

    const updatedFile: MediaFile = {
      ...file,
      alt: updateDto.alt ?? file.alt,
      caption: updateDto.caption ?? file.caption,
      folder: updateDto.folder ?? file.folder,
      updatedAt: new Date().toISOString(),
    };

    this.files.set(id, updatedFile);
    return updatedFile;
  }

  async delete(id: string): Promise<boolean> {
    // In production, also delete the physical file
    return this.files.delete(id);
  }

  async deleteMany(ids: string[]): Promise<number> {
    let count = 0;
    for (const id of ids) {
      if (this.files.delete(id)) {
        count++;
      }
    }
    return count;
  }

  // ============================================
  // FOLDER OPERATIONS
  // ============================================

  async getFolders(): Promise<string[]> {
    return Array.from(this.folders);
  }

  async createFolder(name: string, parent?: string): Promise<string> {
    const folderPath = parent ? `${parent}/${name}` : name;
    this.folders.add(folderPath);
    return folderPath;
  }

  async deleteFolder(path: string): Promise<boolean> {
    // Delete folder and all files in it
    for (const [id, file] of this.files) {
      if (file.folder === path || file.folder?.startsWith(`${path}/`)) {
        this.files.delete(id);
      }
    }
    return this.folders.delete(path);
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  async getStats(): Promise<{
    totalFiles: number;
    totalSize: number;
    byMimeType: Record<string, number>;
  }> {
    const files = Array.from(this.files.values());
    const byMimeType: Record<string, number> = {};

    let totalSize = 0;
    for (const file of files) {
      totalSize += file.size;
      const type = file.mimeType.split("/")[0];
      byMimeType[type] = (byMimeType[type] || 0) + 1;
    }

    return {
      totalFiles: files.length,
      totalSize,
      byMimeType,
    };
  }
}
