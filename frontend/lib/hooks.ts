/**
 * Frontend React Hooks
 * Hooks for fetching CMS content in React/Next.js components
 * Uses a fetch-on-mount pattern compatible with React 19+ Compiler
 */

"use client";

import { use, cache } from "react";
import {
  cmsApi,
  Page,
  Schema,
  MediaFile,
  SiteSettings,
  getPageWithSchema,
} from "./api";

/**
 * Cached fetch functions for use with React's cache
 */
const cachedFetchPage = cache(async (slug: string) => {
  return cmsApi.pages.getBySlug(slug);
});

const cachedFetchPageWithSchema = cache(async (slug: string) => {
  return getPageWithSchema(slug);
});

const cachedFetchPages = cache(async (schemaId?: string) => {
  const result = await cmsApi.pages.getAll({ schemaId, limit: 100 });
  return result.data;
});

const cachedFetchSchema = cache(async (id: string) => {
  return cmsApi.schemas.getById(id);
});

const cachedFetchMedia = cache(async (type?: string, folder?: string) => {
  return cmsApi.media.getAll({
    type: type as "image" | "video" | "document" | undefined,
    folder,
  });
});

const cachedFetchSettings = cache(async () => {
  return cmsApi.settings.get();
});

/**
 * Hook to fetch a page by slug using React Suspense
 * Wrap component in Suspense boundary
 */
export function usePage(slug: string): Page | null {
  return use(cachedFetchPage(slug));
}

/**
 * Hook to fetch a page with its schema using React Suspense
 * Wrap component in Suspense boundary
 */
export function usePageWithSchema(
  slug: string,
): { page: Page; schema: Schema } | null {
  return use(cachedFetchPageWithSchema(slug));
}

/**
 * Hook to fetch all published pages using React Suspense
 * Wrap component in Suspense boundary
 */
export function usePages(schemaId?: string): Page[] {
  return use(cachedFetchPages(schemaId));
}

/**
 * Hook to fetch a schema by ID using React Suspense
 * Wrap component in Suspense boundary
 */
export function useSchema(id: string): Schema | null {
  return use(cachedFetchSchema(id));
}

/**
 * Hook to fetch media files using React Suspense
 * Wrap component in Suspense boundary
 */
export function useMedia(
  type?: "image" | "video" | "document",
  folder?: string,
): MediaFile[] {
  return use(cachedFetchMedia(type, folder));
}

/**
 * Hook to fetch site settings using React Suspense
 * Wrap component in Suspense boundary
 */
export function useSiteSettings(): SiteSettings {
  return use(cachedFetchSettings());
}

/**
 * Server-side fetch functions for Next.js App Router
 * Use in Server Components or generateStaticParams
 */

export async function fetchPage(slug: string): Promise<Page | null> {
  return cmsApi.pages.getBySlug(slug);
}

export async function fetchPageWithSchema(slug: string) {
  return getPageWithSchema(slug);
}

export async function fetchPages(schemaId?: string): Promise<Page[]> {
  const result = await cmsApi.pages.getAll({ schemaId, limit: 100 });
  return result.data;
}

export async function fetchSchema(id: string): Promise<Schema | null> {
  return cmsApi.schemas.getById(id);
}

export async function fetchMedia(
  type?: "image" | "video" | "document",
  folder?: string,
): Promise<MediaFile[]> {
  return cmsApi.media.getAll({ type, folder });
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  return cmsApi.settings.get();
}
