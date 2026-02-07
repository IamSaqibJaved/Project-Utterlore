"use client";

import React, { useState } from "react";
import {
  Image,
  Upload,
  Grid,
  List,
  Search,
  Filter,
  Trash2,
  Download,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Badge,
} from "@/components/ui";

export default function MediaLibraryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock media files
  const mediaFiles = [
    {
      id: "1",
      name: "CarasoulWallpaper.jpg",
      type: "image/jpeg",
      size: "2.4 MB",
      url: "/assets/images/CarasoulWallpaper.jpg",
      uploadedAt: "2024-01-10",
    },
    {
      id: "2",
      name: "AboutUs.png",
      type: "image/png",
      size: "1.8 MB",
      url: "/assets/images/AboutUs.png",
      uploadedAt: "2024-01-09",
    },
    {
      id: "3",
      name: "logo.png",
      type: "image/png",
      size: "124 KB",
      url: "/assets/images/logo.png",
      uploadedAt: "2024-01-08",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground">
            Manage images and files for your website
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent className="flex flex-wrap items-center gap-4 p-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files..."
              className="pl-10"
            />
          </div>

          {/* Filter */}
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>

          {/* View Mode */}
          <div className="flex items-center rounded-lg border">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      {viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mediaFiles.map((file) => (
            <Card
              key={file.id}
              className="group cursor-pointer overflow-hidden"
            >
              <div className="relative aspect-square bg-muted">
                <div className="flex h-full w-full items-center justify-center">
                  <Image className="h-12 w-12 text-muted-foreground" />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button size="icon" variant="secondary">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{file.size}</span>
                  <span>{file.uploadedAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Upload Card */}
          <Card className="cursor-pointer border-dashed transition-colors hover:border-primary hover:bg-muted/50">
            <div className="flex aspect-square flex-col items-center justify-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">Upload</p>
              <p className="text-xs text-muted-foreground">Click or drag</p>
            </div>
          </Card>
        </div>
      ) : (
        /* List View */
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Size
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Uploaded
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {mediaFiles.map((file) => (
                  <tr key={file.id} className="border-b last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                          <Image className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">{file.type}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {file.size}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {file.uploadedAt}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Info */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="flex items-start gap-4 p-4">
          <Image className="h-6 w-6 text-blue-600" />
          <div>
            <h3 className="font-medium text-blue-900">Media Integration</h3>
            <p className="text-sm text-blue-700">
              Files uploaded here can be referenced in page content. Full upload
              functionality with cloud storage integration coming soon.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
