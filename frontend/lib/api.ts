/**
 * Frontend API Client
 * Read-only API client for fetching published content from the CMS backend
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api";

// Types
export interface PageSection {
  id: string;
  sectionId: string;
  data: Record<string, unknown>;
  order: number;
  enabled?: boolean;
}

export interface Page {
  id: string;
  schemaId: string;
  slug: string;
  title: string;
  status: "draft" | "published";
  publishedAt?: string;
  sections: PageSection[];
  createdAt: string;
  updatedAt: string;
}

export interface SectionField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  defaultValue?: unknown;
  options?: { label: string; value: string }[];
  fields?: SectionField[];
}

export interface SectionSchema {
  id: string;
  name: string;
  label: string;
  icon?: string;
  fields: SectionField[];
}

export interface Schema {
  id: string;
  name: string;
  label: string;
  description?: string;
  sections: SectionSchema[];
  createdAt: string;
  updatedAt: string;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: "image" | "video" | "document";
  size: number;
  folder?: string;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription?: string;
  logo?: string;
  favicon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  socialLinks?: Record<string, string>;
  analytics?: {
    googleAnalyticsId?: string;
    facebookPixelId?: string;
  };
  seo?: {
    defaultTitle?: string;
    defaultDescription?: string;
    defaultImage?: string;
  };
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "An error occurred" }));
      throw new ApiError(
        response.status,
        error.message || `HTTP ${response.status}`,
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Failed to connect to API");
  }
}

/**
 * Frontend CMS API Client
 * Provides read-only access to published content
 */
export const cmsApi = {
  /**
   * Pages API - Fetch published pages
   */
  pages: {
    /**
     * Get all published pages
     */
    getAll: async (params?: {
      page?: number;
      limit?: number;
      schemaId?: string;
    }): Promise<{
      data: Page[];
      total: number;
      page: number;
      limit: number;
    }> => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set("page", String(params.page));
      if (params?.limit) searchParams.set("limit", String(params.limit));
      if (params?.schemaId) searchParams.set("schemaId", params.schemaId);
      // Only fetch published pages
      searchParams.set("status", "published");

      const query = searchParams.toString();
      return request(`/pages${query ? `?${query}` : ""}`);
    },

    /**
     * Get a page by slug (most common for frontend)
     */
    getBySlug: async (slug: string): Promise<Page | null> => {
      try {
        return await request(`/pages/by-slug?slug=${encodeURIComponent(slug)}`);
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          return null;
        }
        throw error;
      }
    },

    /**
     * Get a page by ID
     */
    getById: async (id: string): Promise<Page | null> => {
      try {
        return await request(`/pages/${id}`);
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          return null;
        }
        throw error;
      }
    },
  },

  /**
   * Schemas API - Fetch schemas for rendering
   */
  schemas: {
    /**
     * Get all schemas
     */
    getAll: async (): Promise<Schema[]> => {
      return request("/schemas");
    },

    /**
     * Get a schema by ID
     */
    getById: async (id: string): Promise<Schema | null> => {
      try {
        return await request(`/schemas/${id}`);
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          return null;
        }
        throw error;
      }
    },
  },

  /**
   * Media API - Get media files
   */
  media: {
    /**
     * Get all media files
     */
    getAll: async (params?: {
      type?: "image" | "video" | "document";
      folder?: string;
    }): Promise<MediaFile[]> => {
      const searchParams = new URLSearchParams();
      if (params?.type) searchParams.set("type", params.type);
      if (params?.folder) searchParams.set("folder", params.folder);

      const query = searchParams.toString();
      return request(`/media${query ? `?${query}` : ""}`);
    },

    /**
     * Get a media file by ID
     */
    getById: async (id: string): Promise<MediaFile | null> => {
      try {
        return await request(`/media/${id}`);
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          return null;
        }
        throw error;
      }
    },
  },

  /**
   * Settings API - Get site settings
   */
  settings: {
    /**
     * Get all site settings
     */
    get: async (): Promise<SiteSettings> => {
      return request("/settings");
    },
  },
};

/**
 * Helper function to get a page with its schema
 * Useful for rendering dynamic pages with section schemas
 */
export async function getPageWithSchema(slug: string): Promise<{
  page: Page;
  schema: Schema;
} | null> {
  const page = await cmsApi.pages.getBySlug(slug);
  if (!page) return null;

  const schema = await cmsApi.schemas.getById(page.schemaId);
  if (!schema) return null;

  return { page, schema };
}

/**
 * Helper function to render section data with schema
 * Maps section data to include field definitions for rendering
 */
export function mapSectionWithSchema(
  section: PageSection,
  schema: Schema,
): {
  section: PageSection;
  sectionSchema: SectionSchema | undefined;
} {
  const sectionSchema = schema.sections.find((s) => s.id === section.sectionId);
  return { section, sectionSchema };
}

export default cmsApi;
