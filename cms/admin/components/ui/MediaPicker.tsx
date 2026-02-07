"use client";

import React from "react";
import { Image, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Input } from "./Input";

interface MediaPickerProps {
  value?: string;
  onChange?: (value: string) => void;
  accept?: string;
  className?: string;
  placeholder?: string;
}

export function MediaPicker({
  value,
  onChange,
  accept = "image/*",
  className,
  placeholder = "Select or enter image URL",
}: MediaPickerProps) {
  const [imageError, setImageError] = React.useState(false);

  // Reset error state when value changes
  React.useEffect(() => {
    setImageError(false);
  }, [value]);

  const handleClear = () => {
    onChange?.("");
    setImageError(false);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-2">
        <Input
          type="text"
          value={value || ""}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => {
            // Open media library modal (to be implemented)
            console.log("Open media library");
          }}
        >
          <Image className="h-4 w-4" />
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Preview */}
      {value && (
        <div className="relative h-32 w-full overflow-hidden rounded-lg border bg-muted">
          {imageError ? (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              <div className="text-center">
                <p>Image failed to load</p>
              </div>
            </div>
          ) : (
            <img
              src={value}
              alt="Preview"
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      )}

      {/* Upload zone */}
      {!value && (
        <div className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-muted-foreground/50">
          <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Click to upload or drag and drop
          </p>
        </div>
      )}
    </div>
  );
}

export default MediaPicker;
