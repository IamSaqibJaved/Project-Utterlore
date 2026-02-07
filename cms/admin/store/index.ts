import { create } from "zustand";
import { PageContent, SectionContent } from "@/types/schema";
import { allPageContent } from "@/data/mockData";
import { api } from "@/lib/api";

// ============================================
// PAGE CONTENT STORE
// ============================================

interface PageContentState {
  pages: Record<string, PageContent>;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;

  // Actions
  loadPage: (pageId: string) => Promise<PageContent | null>;
  loadPageBySlug: (slug: string) => Promise<PageContent | null>;
  savePage: (pageId: string, content: PageContent) => Promise<void>;
  updateSections: (pageId: string, sections: SectionContent[]) => void;
  updateSection: (
    pageId: string,
    sectionId: string,
    data: Record<string, unknown>,
  ) => Promise<void>;
  resetToDefault: (pageId: string) => void;
}

export const usePageContentStore = create<PageContentState>((set, get) => ({
  pages: { ...allPageContent }, // Initialize with mock data as fallback
  isLoading: false,
  isSaving: false,
  error: null,

  loadPage: async (pageId: string) => {
    set({ isLoading: true, error: null });

    try {
      // Try to fetch from API
      const page = await api.getPage(pageId);

      if (page) {
        set((state) => ({
          pages: { ...state.pages, [pageId]: page },
          isLoading: false,
        }));
        return page;
      }

      // Fall back to local mock data if API fails
      const localPage = get().pages[pageId] || null;
      set({ isLoading: false });
      return localPage;
    } catch (error) {
      console.error("Failed to load page from API:", error);
      // Fall back to local mock data
      const localPage = get().pages[pageId] || null;
      set({
        isLoading: false,
        error: "Failed to load page from API, using local data",
      });
      return localPage;
    }
  },

  loadPageBySlug: async (slug: string) => {
    set({ isLoading: true, error: null });

    try {
      const page = await api.getPageBySlug(slug);

      if (page) {
        set((state) => ({
          pages: { ...state.pages, [page.id]: page },
          isLoading: false,
        }));
        return page;
      }

      set({ isLoading: false });
      // If the API doesn't have this page yet (common for config pages like
      // /config/header), fall back to local mock data if present.
      const localPage = Object.values(get().pages).find((p) => p.slug === slug);
      if (localPage) {
        set((state) => ({
          pages: { ...state.pages, [localPage.id]: localPage },
          isLoading: false,
        }));
        return localPage;
      }

      return null;
    } catch (error) {
      console.error("Failed to load page by slug:", error);
      // Fall back to local mock data if API fails
      const localPage = Object.values(get().pages).find((p) => p.slug === slug);
      if (localPage) {
        set({ isLoading: false, error: "Failed to load page from API, using local data" });
        return localPage;
      }

      set({ isLoading: false, error: "Failed to load page" });
      return null;
    }
  },

  savePage: async (pageId: string, content: PageContent) => {
    set({ isSaving: true, error: null });

    try {
      // Check if page exists in API by slug
      const apiPage = await api.getPageBySlug(content.slug);

      if (apiPage) {
        // Update existing page in API
        await api.updatePage(apiPage.id, {
          slug: content.slug,
          sections: content.sections.map((s) => ({
            id: s.id,
            enabled: s.enabled,
            order: s.order,
            data: s.data,
          })),
          metadata: content.metadata,
        });
      } else {
        // Create new page in API
        await api.createPage({
          pageSchemaId: content.pageSchemaId,
          slug: content.slug,
          sections: content.sections.map((s) => ({
            id: s.id,
            enabled: s.enabled,
            order: s.order,
            data: s.data,
          })),
          metadata: content.metadata,
        });
      }

      // Update local state
      set((state) => ({
        pages: {
          ...state.pages,
          [pageId]: {
            ...content,
            metadata: {
              ...content.metadata,
              lastModified: new Date().toISOString(),
            },
          },
        },
        isSaving: false,
      }));
    } catch (error) {
      console.error("Failed to save page to API:", error);

      // Still update local state even if API fails
      set((state) => ({
        pages: {
          ...state.pages,
          [pageId]: {
            ...content,
            metadata: {
              ...content.metadata,
              lastModified: new Date().toISOString(),
            },
          },
        },
        isSaving: false,
        error: "Failed to save to API, saved locally",
      }));
    }
  },

  updateSections: (pageId: string, sections: SectionContent[]) => {
    set((state) => {
      const page = state.pages[pageId];
      if (!page) return state;

      return {
        pages: {
          ...state.pages,
          [pageId]: {
            ...page,
            sections,
          },
        },
      };
    });
  },

  updateSection: async (
    pageId: string,
    sectionId: string,
    data: Record<string, unknown>,
  ) => {
    set({ isSaving: true, error: null });

    try {
      const page = get().pages[pageId];
      if (!page) {
        throw new Error("Page not found");
      }

      // Update section via API
      await api.updateSection(page.id, sectionId, {
        data,
      });

      // Update local state
      set((state) => {
        const currentPage = state.pages[pageId];
        if (!currentPage) return state;

        return {
          pages: {
            ...state.pages,
            [pageId]: {
              ...currentPage,
              sections: currentPage.sections.map((s) =>
                s.id === sectionId ? { ...s, data } : s,
              ),
              metadata: {
                ...currentPage.metadata,
                lastModified: new Date().toISOString(),
              },
            },
          },
          isSaving: false,
        };
      });
    } catch (error) {
      console.error("Failed to update section:", error);
      set({ isSaving: false, error: "Failed to update section" });
    }
  },

  resetToDefault: (pageId: string) => {
    const defaultContent = allPageContent[pageId];
    if (defaultContent) {
      set((state) => ({
        pages: {
          ...state.pages,
          [pageId]: { ...defaultContent },
        },
      }));
    }
  },
}));

// ============================================
// UI STATE STORE
// ============================================

interface UIState {
  sidebarOpen: boolean;
  activePageId: string | null;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActivePageId: (pageId: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  activePageId: null,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActivePageId: (pageId) => set({ activePageId: pageId }),
}));
