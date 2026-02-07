"use client";

import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { TooltipProvider } from "@/components/ui/Tooltip";
import AdminLayout from "@/components/layout/AdminLayout";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="utterlore-cms-theme">
      <TooltipProvider>
        <AdminLayout>{children}</AdminLayout>
      </TooltipProvider>
    </ThemeProvider>
  );
}
