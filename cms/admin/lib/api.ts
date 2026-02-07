// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api";

// ============================================
// TYPES
// ============================================

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PageContent {
  id: string;
  pageSchemaId: string;
  slug: string;
  sections: SectionContent[];
  metadata: {
    title?: string;
    description?: string;
    lastModified: string;
    modifiedBy?: string;
  };
}

export interface SectionContent {
  id: string;
  enabled: boolean;
  order: number;
  data: Record<string, unknown>;
}

export interface PageSchema {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sections: SectionSchema[];
  settings?: {
    enableSectionReordering?: boolean;
    enableSectionToggle?: boolean;
  };
}

export interface SectionSchema {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  fields: FieldDefinition[];
  order?: number;
  enabled?: boolean;
}

export interface FieldDefinition {
  name: string;
  label: string;
  type: string;
  description?: string;
  required?: boolean;
  defaultValue?: unknown;
  placeholder?: string;
  [key: string]: unknown;
}

export interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  alt?: string;
  caption?: string;
  folder?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CMSSettings {
  siteName: string;
  siteDescription?: string;
  logo?: string;
  favicon?: string;
  theme: "light" | "dark" | "system";
  language: string;
  timezone: string;
}

// ============================================
// HTTP CLIENT
// ============================================

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Request failed" }));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`,
      );
    }

    return response.json();
  }

  // ============================================
  // PAGES API
  // ============================================

  async getPages(): Promise<PageContent[]> {
    return this.request<PageContent[]>("/pages");
  }

  async getPage(id: string): Promise<PageContent | null> {
    try {
      return await this.request<PageContent>(`/pages/${id}`);
    } catch (error) {
      if (error instanceof Error && error.message.includes("404")) {
        return null;
      }
      throw error;
    }
  }

  async getPageBySlug(slug: string): Promise<PageContent | null> {
    try {
      return await this.request<PageContent>(
        `/pages/by-slug?slug=${encodeURIComponent(slug)}`,
      );
    } catch (error) {
      if (error instanceof Error && error.message.includes("404")) {
        return null;
      }
      throw error;
    }
  }

  async createPage(data: Partial<PageContent>): Promise<PageContent> {
    return this.request<PageContent>("/pages", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updatePage(
    id: string,
    data: Partial<PageContent>,
  ): Promise<PageContent> {
    return this.request<PageContent>(`/pages/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deletePage(id: string): Promise<void> {
    return this.request<void>(`/pages/${id}`, {
      method: "DELETE",
    });
  }

  async updateSection(
    pageId: string,
    sectionId: string,
    data: Partial<SectionContent>,
  ): Promise<SectionContent> {
    return this.request<SectionContent>(
      `/pages/${pageId}/sections/${sectionId}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
    );
  }

  async reorderSections(pageId: string, sectionIds: string[]): Promise<void> {
    return this.request<void>(`/pages/${pageId}/sections/reorder`, {
      method: "PUT",
      body: JSON.stringify({ sectionIds }),
    });
  }

  // ============================================
  // SCHEMAS API
  // ============================================

  async getSchemas(): Promise<PageSchema[]> {
    return this.request<PageSchema[]>("/schemas");
  }

  async getSchema(id: string): Promise<PageSchema> {
    return this.request<PageSchema>(`/schemas/${id}`);
  }

  async getSchemaBySlug(slug: string): Promise<PageSchema> {
    return this.request<PageSchema>(
      `/schemas/by-slug?slug=${encodeURIComponent(slug)}`,
    );
  }

  // ============================================
  // MEDIA API
  // ============================================

  async getMedia(folder?: string): Promise<MediaFile[]> {
    const query = folder ? `?folder=${encodeURIComponent(folder)}` : "";
    return this.request<MediaFile[]>(`/media${query}`);
  }

  async getMediaFile(id: string): Promise<MediaFile> {
    return this.request<MediaFile>(`/media/${id}`);
  }

  async uploadFile(file: File, folder?: string): Promise<MediaFile> {
    const formData = new FormData();
    formData.append("file", file);
    if (folder) {
      formData.append("folder", folder);
    }

    const response = await fetch(`${this.baseUrl}/media/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return response.json();
  }

  async uploadFiles(files: File[], folder?: string): Promise<MediaFile[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    if (folder) {
      formData.append("folder", folder);
    }

    const response = await fetch(`${this.baseUrl}/media/upload/multiple`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return response.json();
  }

  async updateMedia(
    id: string,
    data: { alt?: string; caption?: string; folder?: string },
  ): Promise<MediaFile> {
    return this.request<MediaFile>(`/media/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteMedia(id: string): Promise<void> {
    return this.request<void>(`/media/${id}`, {
      method: "DELETE",
    });
  }

  async getMediaFolders(): Promise<string[]> {
    return this.request<string[]>("/media/folders/list");
  }

  async createMediaFolder(
    name: string,
    parent?: string,
  ): Promise<{ path: string }> {
    return this.request<{ path: string }>("/media/folders", {
      method: "POST",
      body: JSON.stringify({ name, parent }),
    });
  }

  // ============================================
  // SETTINGS API
  // ============================================

  async getSettings(): Promise<CMSSettings> {
    return this.request<CMSSettings>("/settings");
  }

  async updateSettings(data: Partial<CMSSettings>): Promise<CMSSettings> {
    return this.request<CMSSettings>("/settings", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async resetSettings(): Promise<CMSSettings> {
    return this.request<CMSSettings>("/settings/reset", {
      method: "POST",
    });
  }
}

// Export singleton instance
export const api = new ApiClient(API_BASE_URL);

// Export class for testing/custom instances
export { ApiClient };
