"use client";

import React from "react";
import Link from "next/link";
import { FileText, Home, Users, ArrowRight, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
} from "@/components/ui";
import { pageSchemas } from "@/schemas";

export default function PagesIndex() {
  const iconMap: Record<string, React.ElementType> = {
    Home,
    Users,
    FileText,
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pages</h1>
          <p className="text-muted-foreground">
            Manage content for all pages on your website
          </p>
        </div>
        <Link href="/pages/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Page
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {pageSchemas.map((schema) => {
          const Icon = schema.icon ? iconMap[schema.icon] : FileText;
          const href = `/pages/${schema.id.replace("-page", "")}`;

          return (
            <Card key={schema.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{schema.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {schema.slug}
                      </CardDescription>
                    </div>
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
                  <Link href={href}>
                    <Button variant="ghost" size="sm">
                      Edit Page
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
