// Content types for the CMS data layer

export interface ContentEntry {
  id: string;
  type: string;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  status: "draft" | "published" | "archived";
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  alt?: string;
  caption?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  avatar?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  timestamp: string;
  details?: Record<string, unknown>;
}
