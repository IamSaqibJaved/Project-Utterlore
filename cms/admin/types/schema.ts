// ============================================
// FIELD TYPES - Define the types of fields available in the CMS
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
// FIELD DEFINITIONS - Schema for defining form fields
// ============================================

export interface BaseFieldDefinition {
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
}

export interface TextFieldDefinition extends BaseFieldDefinition {
  type: "text";
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  defaultValue?: string;
}

export interface TextareaFieldDefinition extends BaseFieldDefinition {
  type: "textarea";
  minLength?: number;
  maxLength?: number;
  rows?: number;
  defaultValue?: string;
}

export interface RichTextFieldDefinition extends BaseFieldDefinition {
  type: "richtext";
  defaultValue?: string;
}

export interface NumberFieldDefinition extends BaseFieldDefinition {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

export interface BooleanFieldDefinition extends BaseFieldDefinition {
  type: "boolean";
  defaultValue?: boolean;
}

export interface SelectFieldDefinition extends BaseFieldDefinition {
  type: "select";
  options: { label: string; value: string }[];
  defaultValue?: string;
}

export interface ImageFieldDefinition extends BaseFieldDefinition {
  type: "image";
  accept?: string;
  maxSize?: number;
  defaultValue?: string;
}

export interface ImagesFieldDefinition extends BaseFieldDefinition {
  type: "images";
  accept?: string;
  maxSize?: number;
  maxItems?: number;
  defaultValue?: string[];
}

export interface ColorFieldDefinition extends BaseFieldDefinition {
  type: "color";
  defaultValue?: string;
}

export interface UrlFieldDefinition extends BaseFieldDefinition {
  type: "url";
  defaultValue?: string;
}

export interface ArrayFieldDefinition extends BaseFieldDefinition {
  type: "array";
  itemType: FieldDefinition;
  minItems?: number;
  maxItems?: number;
  defaultValue?: unknown[];
}

export interface ObjectFieldDefinition extends BaseFieldDefinition {
  type: "object";
  fields: FieldDefinition[];
  defaultValue?: Record<string, unknown>;
}

export interface GroupFieldDefinition extends BaseFieldDefinition {
  type: "group";
  fields: FieldDefinition[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export type FieldDefinition =
  | TextFieldDefinition
  | TextareaFieldDefinition
  | RichTextFieldDefinition
  | NumberFieldDefinition
  | BooleanFieldDefinition
  | SelectFieldDefinition
  | ImageFieldDefinition
  | ImagesFieldDefinition
  | ColorFieldDefinition
  | UrlFieldDefinition
  | ArrayFieldDefinition
  | ObjectFieldDefinition
  | GroupFieldDefinition;

// ============================================
// SECTION SCHEMA - Define page sections
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
// PAGE SCHEMA - Define full page structure
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
// CONTENT DATA - Actual content stored
// ============================================

export interface SectionContent {
  id: string;
  enabled: boolean;
  order: number;
  data: Record<string, unknown>;
}

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
// CMS CONFIGURATION
// ============================================

export interface CMSConfig {
  name: string;
  logo?: string;
  pages: PageSchema[];
  settings?: {
    theme?: "light" | "dark" | "system";
    language?: string;
  };
}

// ============================================
// NAVIGATION TYPES
// ============================================

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  badge?: string | number;
}

export interface NavigationConfig {
  main: NavItem[];
  settings?: NavItem[];
}
