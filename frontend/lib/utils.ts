/**
 * Utility functions for the frontend
 */

/**
 * Check if a string is an external URL (http/https)
 */
export function isExternalUrl(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}

/**
 * Check if a string is a local path (starts with / or ./)
 */
export function isLocalPath(src: string): boolean {
  return src.startsWith("/") || src.startsWith("./");
}

/**
 * Get the proper image source for Next.js Image component
 * Handles both local paths (/assets/images/...) and external URLs (https://...)
 */
export function getImageSrc(
  src: string | undefined,
  fallback?: string,
): string {
  if (!src) {
    return fallback || "/assets/images/placeholder.jpg";
  }

  // If it's already a valid URL or local path, return as-is
  if (isExternalUrl(src) || isLocalPath(src)) {
    return src;
  }

  // Otherwise, assume it's a relative path and prepend /
  return `/${src}`;
}

/**
 * Normalize an array of image sources
 */
export function normalizeImageSources(
  images: string[] | undefined,
  fallback?: string[],
): string[] {
  if (!images || images.length === 0) {
    return fallback || ["/assets/images/placeholder.jpg"];
  }

  return images.map((img) => getImageSrc(img));
}
