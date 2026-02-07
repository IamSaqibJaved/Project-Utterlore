"use client";

import React, { useEffect, useState } from "react";
import { usePageContentStore } from "@/store";
import { PageEditor } from "@/components/forms";
import { aboutPageSchema } from "@/schemas";
import type { SectionContent, PageContent } from "@/types/schema";
import { Loader2 } from "lucide-react";

export default function AboutPageEditor() {
  const { pages, isLoading, isSaving, loadPage, updateSections, savePage } =
    usePageContentStore();
  const [localContent, setLocalContent] = useState<SectionContent[]>([]);
  const pageId = "about-page";

  useEffect(() => {
    loadPage(pageId).then((content) => {
      if (content) {
        setLocalContent(content.sections);
      }
    });
  }, [loadPage]);

  const handleChange = (sections: SectionContent[]) => {
    setLocalContent(sections);
    updateSections(pageId, sections);
  };

  const handleSave = async () => {
    const currentPage = pages[pageId];
    if (currentPage) {
      const updatedPage: PageContent = {
        ...currentPage,
        sections: localContent,
      };
      await savePage(pageId, updatedPage);
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
        <h1 className="text-3xl font-bold">{aboutPageSchema.name}</h1>
        <p className="text-muted-foreground">{aboutPageSchema.description}</p>
      </div>

      <PageEditor
        sections={aboutPageSchema.sections}
        content={localContent}
        onChange={handleChange}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
}
