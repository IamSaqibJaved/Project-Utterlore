import { PageContent, SectionContent, PageSchema } from "@/types/schema";
import { allPageContent } from "@/data/mockData";
import { getPageSchema } from "@/schemas";

// ============================================
// DATA SERVICE INTERFACE
// This abstraction allows swapping mock data with real API later
// ============================================

export interface DataService {
  getPageContent(pageId: string): Promise<PageContent | null>;
  savePageContent(pageId: string, content: PageContent): Promise<void>;
  exportPageContent(pageId: string): Promise<string>;
}

// ============================================
// MOCK DATA SERVICE
// ============================================

class MockDataService implements DataService {
  private storage: Record<string, PageContent> = { ...allPageContent };

  async getPageContent(pageId: string): Promise<PageContent | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    return this.storage[pageId] || null;
  }

  async savePageContent(pageId: string, content: PageContent): Promise<void> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    this.storage[pageId] = {
      ...content,
      metadata: {
        ...content.metadata,
        lastModified: new Date().toISOString(),
      },
    };
  }

  async exportPageContent(pageId: string): Promise<string> {
    const content = await this.getPageContent(pageId);
    if (!content) throw new Error("Page not found");

    // Generate frontend-friendly JSON
    const schema = getPageSchema(pageId);
    const exportData = this.transformForFrontend(content, schema);

    return JSON.stringify(exportData, null, 2);
  }

  private transformForFrontend(
    content: PageContent,
    schema: PageSchema | undefined
  ): Record<string, unknown> {
    // Transform CMS data to frontend-consumable format
    const result: Record<string, unknown> = {
      slug: content.slug,
      metadata: content.metadata,
      sections: {},
    };

    content.sections.forEach((section) => {
      if (section.enabled) {
        result.sections = {
          ...(result.sections as Record<string, unknown>),
          [section.id]: section.data,
        };
      }
    });

    return result;
  }
}

// ============================================
// API DATA SERVICE (for future use)
// ============================================

class APIDataService implements DataService {
  private baseUrl: string;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
  }

  async getPageContent(pageId: string): Promise<PageContent | null> {
    const response = await fetch(`${this.baseUrl}/pages/${pageId}`);
    if (!response.ok) return null;
    return response.json();
  }

  async savePageContent(pageId: string, content: PageContent): Promise<void> {
    const response = await fetch(`${this.baseUrl}/pages/${pageId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    if (!response.ok) throw new Error("Failed to save");
  }

  async exportPageContent(pageId: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/pages/${pageId}/export`);
    if (!response.ok) throw new Error("Failed to export");
    return response.text();
  }
}

// ============================================
// SINGLETON INSTANCE
// ============================================

// Use mock service for now, can be swapped to API service later
export const dataService: DataService = new MockDataService();

// For future API integration:
// export const dataService: DataService = new APIDataService('https://api.utterlore.com');
