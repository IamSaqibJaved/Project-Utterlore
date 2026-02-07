"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, FileText, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui";
import { pageSchemas } from "@/schemas";
import { usePageContentStore } from "@/store";
import type { PageContent, SectionContent } from "@/types/schema";

export default function CreatePage() {
  const router = useRouter();
  const { savePage } = usePageContentStore();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSchemaSelect = (schemaId: string) => {
    setSelectedSchema(schemaId);
    setShowModal(true);
    setError(null);

    // Pre-fill with schema defaults
    const schema = pageSchemas.find((s) => s.id === schemaId);
    if (schema) {
      setFormData({
        title: schema.name,
        slug: schema.slug,
        description: schema.description || "",
      });
    }
  };

  const handleCreate = async () => {
    if (!selectedSchema) return;

    // Validation
    if (!formData.title.trim()) {
      setError("Page title is required");
      return;
    }
    if (!formData.slug.trim()) {
      setError("Page slug is required");
      return;
    }
    if (!formData.slug.startsWith("/")) {
      setError("Slug must start with /");
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const schema = pageSchemas.find((s) => s.id === selectedSchema);
      if (!schema) throw new Error("Schema not found");

      // Create default sections from schema
      const defaultSections: SectionContent[] = schema.sections.map(
        (section, index) => ({
          id: section.id,
          enabled: section.enabled ?? true,
          order: section.order ?? index,
          data: section.fields.reduce(
            (acc, field) => {
              if (field.defaultValue !== undefined) {
                acc[field.name] = field.defaultValue;
              }
              return acc;
            },
            {} as Record<string, unknown>,
          ),
        }),
      );

      // Create the page content
      const newPage: PageContent = {
        id: `page-${Date.now()}`,
        pageSchemaId: selectedSchema,
        slug: formData.slug,
        sections: defaultSections,
        metadata: {
          title: formData.title,
          description: formData.description,
          lastModified: new Date().toISOString(),
          modifiedBy: "admin",
        },
      };

      // Save to API
      await savePage(newPage.id, newPage);

      // Redirect to edit page
      const editPath = `/pages/${selectedSchema.replace("-page", "")}`;
      router.push(editPath);
    } catch (err) {
      console.error("Failed to create page:", err);
      setError("Failed to create page. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Page</h1>
        <p className="text-muted-foreground">
          Choose a page template to get started
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {pageSchemas.map((schema) => (
          <Card
            key={schema.id}
            className="cursor-pointer transition-all hover:shadow-md hover:border-primary"
            onClick={() => handleSchemaSelect(schema.id)}
          >
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{schema.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {schema.slug}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                {schema.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {schema.sections.length} sections
                </span>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Page Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
            <DialogDescription>
              Enter the details for your new page
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Page Title
              </label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Contact Us"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">URL Slug</label>
              <Input
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="e.g., /contact"
              />
              <p className="text-xs text-muted-foreground mt-1">
                The URL path for this page (must start with /)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description (Optional)
              </label>
              <Input
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description for SEO"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Page
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
