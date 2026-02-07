"use client";

import React from "react";
import { FileText, Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Input,
  Badge,
} from "@/components/ui";

export default function ContentPage() {
  // Mock content entries
  const contentEntries = [
    {
      id: "1",
      title: "Welcome to UtterLore",
      type: "Blog Post",
      status: "published",
      updatedAt: "2024-01-10",
    },
    {
      id: "2",
      title: "Our Design Philosophy",
      type: "Blog Post",
      status: "draft",
      updatedAt: "2024-01-09",
    },
    {
      id: "3",
      title: "Fashion Forward",
      type: "Blog Post",
      status: "published",
      updatedAt: "2024-01-08",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content</h1>
          <p className="text-muted-foreground">Manage your content entries</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Entry
        </Button>
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent className="flex flex-wrap items-center gap-4 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search content..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </CardContent>
      </Card>

      {/* Content Table */}
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Updated
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {contentEntries.map((entry) => (
                <tr key={entry.id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <span className="font-medium">{entry.title}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {entry.type}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        entry.status === "published" ? "success" : "secondary"
                      }
                    >
                      {entry.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {entry.updatedAt}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="flex items-start gap-4 p-4">
          <FileText className="h-6 w-6 text-blue-600" />
          <div>
            <h3 className="font-medium text-blue-900">Content Management</h3>
            <p className="text-sm text-blue-700">
              Full content entry management with custom content types coming
              soon. For now, use the Pages section to manage your page content.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
