"use client";

import React from "react";
import {
  Database,
  Plus,
  FileText,
  Type,
  Image,
  List,
  ToggleLeft,
  Link as LinkIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Badge,
} from "@/components/ui";

export default function ContentTypesPage() {
  // Predefined content types (for future expansion)
  const contentTypes = [
    {
      id: "blog-post",
      name: "Blog Post",
      description: "Articles and blog entries",
      fields: 8,
      entries: 0,
      icon: FileText,
    },
    {
      id: "product",
      name: "Product",
      description: "E-commerce products",
      fields: 12,
      entries: 0,
      icon: Database,
    },
    {
      id: "testimonial",
      name: "Testimonial",
      description: "Customer testimonials",
      fields: 5,
      entries: 0,
      icon: Type,
    },
  ];

  // Available field types
  const fieldTypes = [
    { name: "Text", icon: Type, description: "Single line text" },
    { name: "Rich Text", icon: FileText, description: "Formatted content" },
    { name: "Image", icon: Image, description: "Single image upload" },
    { name: "Select", icon: List, description: "Dropdown selection" },
    { name: "Boolean", icon: ToggleLeft, description: "True/false toggle" },
    { name: "URL", icon: LinkIcon, description: "Web links" },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Types</h1>
          <p className="text-muted-foreground">
            Define custom content structures for your application
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Content Type
        </Button>
      </div>

      {/* Content Types Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contentTypes.map((type) => (
          <Card
            key={type.id}
            className="cursor-pointer transition-shadow hover:shadow-md"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <type.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{type.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {type.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{type.fields} fields</span>
                <span>•</span>
                <span>{type.entries} entries</span>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Card */}
        <Card className="cursor-pointer border-dashed transition-colors hover:border-primary hover:bg-muted/50">
          <CardContent className="flex h-full flex-col items-center justify-center py-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="mt-2 font-medium">Create New Type</p>
            <p className="text-xs text-muted-foreground">
              Define a new content structure
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Available Field Types */}
      <Card>
        <CardHeader>
          <CardTitle>Available Field Types</CardTitle>
          <CardDescription>
            These field types can be used when creating content types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {fieldTypes.map((field) => (
              <div
                key={field.name}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <field.icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{field.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {field.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="flex items-start gap-4 p-4">
          <Database className="h-6 w-6 text-blue-600" />
          <div>
            <h3 className="font-medium text-blue-900">Coming Soon</h3>
            <p className="text-sm text-blue-700">
              Custom content types with dynamic field configuration will be
              available in a future update. Currently, you can manage page
              content through the Pages section.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
