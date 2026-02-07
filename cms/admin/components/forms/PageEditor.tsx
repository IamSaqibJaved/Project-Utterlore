"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Power,
  GripVertical,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Switch,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Badge,
} from "@/components/ui";
import { FormRenderer, getDefaultValue } from "./FormRenderer";
import type { SectionSchema, SectionContent } from "@/types/schema";

// ============================================
// SECTION EDITOR - Edits a single section
// ============================================

interface SectionEditorProps {
  schema: SectionSchema;
  content: SectionContent;
  onChange: (content: SectionContent) => void;
  isDragging?: boolean;
}

export function SectionEditor({
  schema,
  content,
  onChange,
  isDragging,
}: SectionEditorProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleDataChange = (newData: Record<string, unknown>) => {
    onChange({
      ...content,
      data: newData,
    });
  };

  const handleToggleEnabled = (enabled: boolean) => {
    onChange({
      ...content,
      enabled,
    });
  };

  return (
    <Card
      className={cn(
        "transition-all",
        isDragging && "opacity-50",
        !content.enabled && "opacity-60"
      )}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GripVertical className="h-5 w-5 cursor-move text-muted-foreground" />
              <CollapsibleTrigger className="flex items-center gap-2 hover:text-primary">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <CardTitle className="text-lg">{schema.name}</CardTitle>
              </CollapsibleTrigger>
              {!content.enabled && <Badge variant="secondary">Disabled</Badge>}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Power className="h-4 w-4 text-muted-foreground" />
                <Switch
                  checked={content.enabled}
                  onCheckedChange={handleToggleEnabled}
                />
              </div>
            </div>
          </div>
          {schema.description && (
            <p className="text-sm text-muted-foreground">
              {schema.description}
            </p>
          )}
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <FormRenderer
              fields={schema.fields}
              values={content.data}
              onChange={handleDataChange}
            />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

// ============================================
// PAGE EDITOR - Full page editor with all sections
// ============================================

interface PageEditorProps {
  sections: SectionSchema[];
  content: SectionContent[];
  onChange: (content: SectionContent[]) => void;
  onSave: () => void;
  isSaving?: boolean;
}

export function PageEditor({
  sections,
  content,
  onChange,
  onSave,
  isSaving,
}: PageEditorProps) {
  // Ensure all sections have content entries
  const getContentForSection = (sectionId: string): SectionContent => {
    const existing = content.find((c) => c.id === sectionId);
    if (existing) return existing;

    // Create default content from schema
    const schema = sections.find((s) => s.id === sectionId);
    const defaultData: Record<string, unknown> = {};

    if (schema) {
      schema.fields.forEach((field) => {
        defaultData[field.name] = getDefaultValue(field);
      });
    }

    return {
      id: sectionId,
      enabled: schema?.enabled ?? true,
      order: schema?.order ?? 0,
      data: defaultData,
    };
  };

  const handleSectionChange = (
    sectionId: string,
    newContent: SectionContent
  ) => {
    const existingIndex = content.findIndex((c) => c.id === sectionId);
    if (existingIndex >= 0) {
      const newContentArray = [...content];
      newContentArray[existingIndex] = newContent;
      onChange(newContentArray);
    } else {
      onChange([...content, newContent]);
    }
  };

  // Sort sections by order
  const sortedSections = [...sections].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Edit Page</h2>
          <p className="text-muted-foreground">
            Manage sections and content for this page
          </p>
        </div>
        <Button onClick={onSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sortedSections.map((schema) => (
          <SectionEditor
            key={schema.id}
            schema={schema}
            content={getContentForSection(schema.id)}
            onChange={(newContent) =>
              handleSectionChange(schema.id, newContent)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default PageEditor;
