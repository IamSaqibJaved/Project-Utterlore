// ============================================
// FIELD TYPES - Same as admin types for consistency
// ============================================

export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "number"
  | "boolean"
  | "select"
  | "image"
  | "images"
  | "color"
  | "url"
  | "array"
  | "object"
  | "group";

// ============================================
// FIELD DEFINITIONS
// ============================================

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  description?: string;
  required?: boolean;
  defaultValue?: unknown;
  placeholder?: string;
  hidden?: boolean;
  disabled?: boolean;
  group?: string;
  // Type-specific properties
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: string }[];
  accept?: string;
  maxSize?: number;
  maxItems?: number;
  minItems?: number;
  itemType?: FieldDefinition;
  fields?: FieldDefinition[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

// ============================================
// SECTION SCHEMA
// ============================================

export interface SectionSchema {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  fields: FieldDefinition[];
  order?: number;
  enabled?: boolean;
}

// ============================================
// PAGE SCHEMA
// ============================================

export interface PageSchema {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sections: SectionSchema[];
  settings?: {
    enableSectionReordering?: boolean;
    enableSectionToggle?: boolean;
  };
}

// ============================================
// SECTION CONTENT
// ============================================

export interface SectionContent {
  id: string;
  enabled: boolean;
  order: number;
  data: Record<string, unknown>;
}

// ============================================
// PAGE CONTENT
// ============================================

export interface PageContent {
  id: string;
  pageSchemaId: string;
  slug: string;
  sections: SectionContent[];
  metadata: {
    title?: string;
    description?: string;
    lastModified: string;
    modifiedBy?: string;
  };
}

// ============================================
// MEDIA TYPES
// ============================================

export interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  alt?: string;
  caption?: string;
  folder?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// SETTINGS TYPES
// ============================================

export interface CMSSettings {
  siteName: string;
  siteDescription?: string;
  logo?: string;
  favicon?: string;
  theme: "light" | "dark" | "system";
  language: string;
  timezone: string;
}
