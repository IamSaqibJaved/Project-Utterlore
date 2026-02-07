"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Image,
  Database,
  Settings,
  ArrowRight,
  TrendingUp,
  Clock,
  Edit3,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
} from "@/components/ui";
import { pageSchemas } from "@/schemas";

export default function Dashboard() {
  // Quick stats
  const stats = [
    {
      label: "Total Pages",
      value: pageSchemas.length,
      icon: FileText,
      color: "text-blue-500",
    },
    {
      label: "Media Files",
      value: 24,
      icon: Image,
      color: "text-green-500",
    },
    {
      label: "Content Types",
      value: 5,
      icon: Database,
      color: "text-purple-500",
    },
    {
      label: "Last Updated",
      value: "2h ago",
      icon: Clock,
      color: "text-orange-500",
    },
  ];

  // Recent activity
  const recentActivity = [
    {
      action: "Updated",
      page: "Landing Page",
      time: "2 hours ago",
      user: "Admin",
    },
    {
      action: "Created",
      page: "About Page",
      time: "1 day ago",
      user: "Admin",
    },
    {
      action: "Modified",
      page: "Hero Section",
      time: "2 days ago",
      user: "Admin",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the UtterLore CMS. Manage your website content from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg bg-muted ${stat.color}`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Jump to frequently used sections</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {pageSchemas.map((schema) => (
              <Link
                key={schema.id}
                href={`/pages/${schema.id.replace("-page", "")}`}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted"
              >
                <div>
                  <p className="font-medium">{schema.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {schema.sections.length} sections
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            ))}
            <Link
              href="/media"
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted"
            >
              <div>
                <p className="font-medium">Media Library</p>
                <p className="text-sm text-muted-foreground">
                  Manage images and files
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest changes to your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Edit3 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {activity.action} {activity.page}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        by {activity.user}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Quick guide to managing your content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <span className="text-lg font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-medium">Edit Pages</h3>
              <p className="text-sm text-muted-foreground">
                Navigate to Pages to edit your Landing or About page content.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <span className="text-lg font-bold text-green-600">2</span>
              </div>
              <h3 className="font-medium">Manage Sections</h3>
              <p className="text-sm text-muted-foreground">
                Enable/disable sections and edit their content using the form
                fields.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <span className="text-lg font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-medium">Save & Export</h3>
              <p className="text-sm text-muted-foreground">
                Save your changes and export JSON data for the frontend.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
