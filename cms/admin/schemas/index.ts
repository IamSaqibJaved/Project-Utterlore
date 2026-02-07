import { PageSchema, CMSConfig, NavigationConfig } from "@/types/schema";
import { landingPageSchema } from "./landing";
import { aboutPageSchema } from "./about";
import { headerSchema } from "./header";

// All page schemas
export const pageSchemas: PageSchema[] = [
  landingPageSchema,
  aboutPageSchema,
  headerSchema,
];

// Get schema by ID
export function getPageSchema(id: string): PageSchema | undefined {
  return pageSchemas.find((schema) => schema.id === id);
}

// Get schema by slug
export function getPageSchemaBySlug(slug: string): PageSchema | undefined {
  return pageSchemas.find((schema) => schema.slug === slug);
}

// CMS Configuration
export const cmsConfig: CMSConfig = {
  name: "UtterLore CMS",
  logo: "/logo.png",
  pages: pageSchemas,
  settings: {
    theme: "light",
    language: "en",
  },
};

// Navigation Configuration
export const navigationConfig: NavigationConfig = {
  main: [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/",
      icon: "LayoutDashboard",
    },
    {
      id: "pages",
      label: "Pages",
      href: "/pages",
      icon: "FileText",
      children: [
        {
          id: "landing",
          label: "Landing Page",
          href: "/pages/landing",
          icon: "Home",
        },
        {
          id: "about",
          label: "About Us",
          href: "/pages/about",
          icon: "Users",
        },
      ],
    },
    {
      id: "content-types",
      label: "Content Types",
      href: "/content-types",
      icon: "Database",
    },
    {
      id: "media",
      label: "Media Library",
      href: "/media",
      icon: "Image",
    },
    {
      id: "config",
      label: "Configuration",
      href: "/config",
      icon: "Settings",
      children: [
        {
          id: "header",
          label: "Header",
          href: "/config/header",
          icon: "Layout",
        },
      ],
    },
  ],
  settings: [
    {
      id: "settings",
      label: "Settings",
      href: "/settings",
      icon: "Settings",
    },
  ],
};

export { landingPageSchema, aboutPageSchema };
