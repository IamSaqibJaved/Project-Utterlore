"use client";

import React, { useEffect, useState } from "react";
import { usePageContentStore } from "@/store";
import { PageEditor } from "@/components/forms";
import { landingPageSchema } from "@/schemas";
import type { SectionContent, PageContent } from "@/types/schema";
import { Card, CardContent } from "@/components/ui";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function LandingPageEditor() {
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
  const pageSlug = "/";

  useEffect(() => {
    // Load page by slug instead of hardcoded ID
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

      // Show success message if no error
      if (!error) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{landingPageSchema.name}</h1>
        <p className="text-muted-foreground">{landingPageSchema.description}</p>
      </div>

      {/* Success/Error Messages */}
      {saveSuccess && (
        <Card className="mb-4 border-green-500 bg-green-50">
          <CardContent className="flex items-center gap-2 p-4">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-green-900">
              Changes saved successfully! Your updates are now live on the
              frontend.
            </p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="mb-4 border-red-500 bg-red-50">
          <CardContent className="flex items-center gap-2 p-4">
            <XCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm font-medium text-red-900">{error}</p>
          </CardContent>
        </Card>
      )}

      <PageEditor
        sections={landingPageSchema.sections}
        content={localContent}
        onChange={handleChange}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
}
