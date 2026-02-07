"use client";

import React, { useEffect, useState } from "react";
import { usePageContentStore } from "@/store";
import { PageEditor } from "@/components/forms";
import { headerSchema } from "@/schemas/header";
import type { SectionContent, PageContent } from "@/types/schema";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function HeaderConfigPage() {
  const {
    pages,
    isLoading,
    isSaving,
    error,
    loadPageBySlug,
    updateSections,
    savePage,
  } = usePageContentStore();
  const [localContent, setLocalContent] = useState<SectionContent[]>([]);
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const pageSlug = "/config/header";

  useEffect(() => {
    loadPageBySlug(pageSlug).then((content) => {
      if (content) {
        setLocalContent(content.sections);
        setCurrentPageId(content.id);
      }
    });
  }, [loadPageBySlug]);

  const handleChange = (sections: SectionContent[]) => {
    setLocalContent(sections);
    if (currentPageId) {
      updateSections(currentPageId, sections);
    }
  };

  const handleSave = async () => {
    if (!currentPageId) {
      console.error("No page ID available");
      return;
    }

    setSaveSuccess(false);
    const currentPage = pages[currentPageId];
    if (currentPage) {
      const updatedPage: PageContent = {
        ...currentPage,
        sections: localContent,
      };
      await savePage(currentPageId, updatedPage);

      // Show success message
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Header Configuration
          </h1>
          <p className="text-muted-foreground mt-2">
            Customize your site header including logo, menu items, buttons, and
            styling
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving || !currentPageId}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : saveSuccess ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/15 p-4 flex items-start gap-3">
          <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-destructive">Error</h3>
            <p className="text-sm text-destructive/90 mt-1">{error}</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <PageEditor
          sections={headerSchema.sections}
          content={localContent}
          onChange={handleChange}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}
