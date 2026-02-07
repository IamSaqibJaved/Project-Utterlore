"use client";

import { useState, useEffect, useCallback } from "react";
import {
  api,
  PageContent,
  PageSchema,
  SectionContent,
  MediaFile,
  CMSSettings,
} from "./api";

// ============================================
// GENERIC ASYNC STATE HOOK
// ============================================

interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

function useAsyncState<T>(initialData: T | null = null): [
  AsyncState<T>,
  {
    setData: (data: T) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
  },
] {
  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    isLoading: false,
    error: null,
  });

  const setData = useCallback((data: T) => {
    setState({ data, isLoading: false, error: null });
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading, error: null }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error, isLoading: false }));
  }, []);

  const reset = useCallback(() => {
    setState({ data: initialData, isLoading: false, error: null });
  }, [initialData]);

  return [state, { setData, setLoading, setError, reset }];
}

// ============================================
// PAGES HOOKS
// ============================================

export function usePages() {
  const [state, actions] = useAsyncState<PageContent[]>([]);

  const fetchPages = useCallback(async () => {
    actions.setLoading(true);
    try {
      const pages = await api.getPages();
      actions.setData(pages);
    } catch (err) {
      actions.setError(
        err instanceof Error ? err.message : "Failed to fetch pages",
      );
    }
  }, [actions]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  return { ...state, refetch: fetchPages };
}

export function usePage(id: string) {
  const [state, actions] = useAsyncState<PageContent>(null);

  const fetchPage = useCallback(async () => {
    if (!id) return;
    actions.setLoading(true);
    try {
      const page = await api.getPage(id);
      actions.setData(page);
    } catch (err) {
      actions.setError(
        err instanceof Error ? err.message : "Failed to fetch page",
      );
    }
  }, [id, actions]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  return { ...state, refetch: fetchPage };
}

export function usePageBySlug(slug: string) {
  const [state, actions] = useAsyncState<PageContent>(null);

  const fetchPage = useCallback(async () => {
    if (!slug) return;
    actions.setLoading(true);
    try {
      const page = await api.getPageBySlug(slug);
      actions.setData(page);
    } catch (err) {
      actions.setError(
        err instanceof Error ? err.message : "Failed to fetch page",
      );
    }
  }, [slug, actions]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  return { ...state, refetch: fetchPage };
}

export function usePageMutations() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePage = useCallback(
    async (id: string, data: Partial<PageContent>) => {
      setIsSaving(true);
      setError(null);
      try {
        const result = await api.updatePage(id, data);
        setIsSaving(false);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to update page";
        setError(message);
        setIsSaving(false);
        throw err;
      }
    },
    [],
  );

  const updateSection = useCallback(
    async (
      pageId: string,
      sectionId: string,
      data: Partial<SectionContent>,
    ) => {
      setIsSaving(true);
      setError(null);
      try {
        const result = await api.updateSection(pageId, sectionId, data);
        setIsSaving(false);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to update section";
        setError(message);
        setIsSaving(false);
        throw err;
      }
    },
    [],
  );

  const createPage = useCallback(async (data: Partial<PageContent>) => {
    setIsSaving(true);
    setError(null);
    try {
      const result = await api.createPage(data);
      setIsSaving(false);
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create page";
      setError(message);
      setIsSaving(false);
      throw err;
    }
  }, []);

  const deletePage = useCallback(async (id: string) => {
    setIsSaving(true);
    setError(null);
    try {
      await api.deletePage(id);
      setIsSaving(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete page";
      setError(message);
      setIsSaving(false);
      throw err;
    }
  }, []);

  return { updatePage, updateSection, createPage, deletePage, isSaving, error };
}

// ============================================
// SCHEMAS HOOKS
// ============================================

export function useSchemas() {
  const [state, actions] = useAsyncState<PageSchema[]>([]);

  const fetchSchemas = useCallback(async () => {
    actions.setLoading(true);
    try {
      const schemas = await api.getSchemas();
      actions.setData(schemas);
    } catch (err) {
      actions.setError(
        err instanceof Error ? err.message : "Failed to fetch schemas",
      );
    }
  }, [actions]);

  useEffect(() => {
    fetchSchemas();
  }, [fetchSchemas]);

  return { ...state, refetch: fetchSchemas };
}

export function useSchema(id: string) {
  const [state, actions] = useAsyncState<PageSchema>(null);

  const fetchSchema = useCallback(async () => {
    if (!id) return;
    actions.setLoading(true);
    try {
      const schema = await api.getSchema(id);
      actions.setData(schema);
    } catch (err) {
      actions.setError(
        err instanceof Error ? err.message : "Failed to fetch schema",
      );
    }
  }, [id, actions]);

  useEffect(() => {
    fetchSchema();
  }, [fetchSchema]);

  return { ...state, refetch: fetchSchema };
}

// ============================================
// MEDIA HOOKS
// ============================================

export function useMedia(folder?: string) {
  const [state, actions] = useAsyncState<MediaFile[]>([]);

  const fetchMedia = useCallback(async () => {
    actions.setLoading(true);
    try {
      const files = await api.getMedia(folder);
      actions.setData(files);
    } catch (err) {
      actions.setError(
        err instanceof Error ? err.message : "Failed to fetch media",
      );
    }
  }, [folder, actions]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  return { ...state, refetch: fetchMedia };
}

export function useMediaMutations() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File, folder?: string) => {
    setIsUploading(true);
    setError(null);
    try {
      const result = await api.uploadFile(file, folder);
      setIsUploading(false);
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to upload file";
      setError(message);
      setIsUploading(false);
      throw err;
    }
  }, []);

  const uploadFiles = useCallback(async (files: File[], folder?: string) => {
    setIsUploading(true);
    setError(null);
    try {
      const result = await api.uploadFiles(files, folder);
      setIsUploading(false);
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to upload files";
      setError(message);
      setIsUploading(false);
      throw err;
    }
  }, []);

  const deleteFile = useCallback(async (id: string) => {
    setError(null);
    try {
      await api.deleteMedia(id);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete file";
      setError(message);
      throw err;
    }
  }, []);

  return { uploadFile, uploadFiles, deleteFile, isUploading, error };
}

// ============================================
// SETTINGS HOOKS
// ============================================

export function useSettings() {
  const [state, actions] = useAsyncState<CMSSettings>(null);

  const fetchSettings = useCallback(async () => {
    actions.setLoading(true);
    try {
      const settings = await api.getSettings();
      actions.setData(settings);
    } catch (err) {
      actions.setError(
        err instanceof Error ? err.message : "Failed to fetch settings",
      );
    }
  }, [actions]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { ...state, refetch: fetchSettings };
}

export function useSettingsMutations() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSettings = useCallback(async (data: Partial<CMSSettings>) => {
    setIsSaving(true);
    setError(null);
    try {
      const result = await api.updateSettings(data);
      setIsSaving(false);
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update settings";
      setError(message);
      setIsSaving(false);
      throw err;
    }
  }, []);

  const resetSettings = useCallback(async () => {
    setIsSaving(true);
    setError(null);
    try {
      const result = await api.resetSettings();
      setIsSaving(false);
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to reset settings";
      setError(message);
      setIsSaving(false);
      throw err;
    }
  }, []);

  return { updateSettings, resetSettings, isSaving, error };
}
