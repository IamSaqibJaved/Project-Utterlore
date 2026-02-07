"use client";

import React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, mounted } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    if (theme === "system") {
      return <Monitor className="h-5 w-5" />;
    }
    return resolvedTheme === "dark" ? (
      <Moon className="h-5 w-5" />
    ) : (
      <Sun className="h-5 w-5" />
    );
  };

  const getTooltip = () => {
    if (theme === "light") return "Light mode (click for dark)";
    if (theme === "dark") return "Dark mode (click for system)";
    return `System mode (${resolvedTheme})`;
  };

  // Show a placeholder while not mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      title={getTooltip()}
      aria-label="Toggle theme"
    >
      {getIcon()}
    </Button>
  );
}
