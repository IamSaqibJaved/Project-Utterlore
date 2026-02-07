"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Input,
  Textarea,
  Label,
  Switch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
  Card,
  CardContent,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Popover,
  PopoverTrigger,
  PopoverContent,
  ColorPicker,
  ColorPickerSelection,
  ColorPickerHue,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerOutput,
  ColorPickerFormat,
} from "@/components/ui";
import type {
  FieldDefinition,
  TextFieldDefinition,
  TextareaFieldDefinition,
  NumberFieldDefinition,
  BooleanFieldDefinition,
  SelectFieldDefinition,
  ImageFieldDefinition,
  ImagesFieldDefinition,
  ColorFieldDefinition,
  UrlFieldDefinition,
  ArrayFieldDefinition,
  ObjectFieldDefinition,
  GroupFieldDefinition,
} from "@/types/schema";

// ============================================
// FIELD RENDERER PROPS
// ============================================

interface FieldRendererProps {
  field: FieldDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
  path?: string;
}

// ============================================
// INDIVIDUAL FIELD COMPONENTS
// ============================================

function TextField({
  field,
  value,
  onChange,
}: {
  field: TextFieldDefinition;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      maxLength={field.maxLength}
      minLength={field.minLength}
      disabled={field.disabled}
    />
  );
}

function TextareaField({
  field,
  value,
  onChange,
}: {
  field: TextareaFieldDefinition;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      rows={field.rows || 3}
      maxLength={field.maxLength}
      minLength={field.minLength}
      disabled={field.disabled}
    />
  );
}

function NumberField({
  field,
  value,
  onChange,
}: {
  field: NumberFieldDefinition;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <Input
      type="number"
      value={value ?? ""}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      placeholder={field.placeholder}
      min={field.min}
      max={field.max}
      step={field.step}
      disabled={field.disabled}
    />
  );
}

function BooleanField({
  field,
  value,
  onChange,
}: {
  field: BooleanFieldDefinition;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={value ?? false}
        onCheckedChange={onChange}
        disabled={field.disabled}
      />
      <span className="text-sm text-muted-foreground">
        {value ? "Enabled" : "Disabled"}
      </span>
    </div>
  );
}

function SelectField({
  field,
  value,
  onChange,
}: {
  field: SelectFieldDefinition;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select
      value={value || ""}
      onValueChange={onChange}
      disabled={field.disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder={field.placeholder || "Select an option"} />
      </SelectTrigger>
      <SelectContent>
        {field.options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ImageField({
  field,
  value,
  onChange,
}: {
  field: ImageFieldDefinition;
  value: string;
  onChange: (value: string) => void;
}) {
  const [imageError, setImageError] = React.useState(false);

  // Reset error state when value changes
  React.useEffect(() => {
    setImageError(false);
  }, [value]);

  return (
    <div className="space-y-2">
      <Input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder || "Enter image URL or path"}
        disabled={field.disabled}
      />
      {value && (
        <div className="relative h-32 w-full overflow-hidden rounded-lg border bg-muted">
          {imageError ? (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              <div className="text-center">
                <p>Image failed to load</p>
                <p className="text-xs">{value}</p>
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
      <Button variant="outline" size="sm" type="button">
        Browse Media Library
      </Button>
    </div>
  );
}

function ImagesField({
  field,
  value,
  onChange,
}: {
  field: ImagesFieldDefinition;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const images = value || [];
  const [imageErrors, setImageErrors] = React.useState<Record<number, boolean>>(
    {},
  );

  const addImage = () => {
    onChange([...images, ""]);
  };

  const updateImage = (index: number, newValue: string) => {
    const newImages = [...images];
    newImages[index] = newValue;
    onChange(newImages);
    // Reset error state for this index
    setImageErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
    // Clean up error state
    setImageErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="space-y-3">
      {images.map((img, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className="flex-1 space-y-2">
            <Input
              type="text"
              value={img}
              onChange={(e) => updateImage(index, e.target.value)}
              placeholder="Enter image URL"
            />
            {img && (
              <div className="relative h-20 w-20 overflow-hidden rounded border bg-muted">
                {imageErrors[index] ? (
                  <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                    Failed
                  </div>
                ) : (
                  <img
                    src={img}
                    alt={`Image ${index + 1}`}
                    className="h-full w-full object-cover"
                    onError={() => handleImageError(index)}
                  />
                )}
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => removeImage(index)}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      {(!field.maxItems || images.length < field.maxItems) && (
        <Button variant="outline" size="sm" type="button" onClick={addImage}>
          <Plus className="mr-2 h-4 w-4" />
          Add Image
        </Button>
      )}
    </div>
  );
}

function ColorField({
  field,
  value,
  onChange,
}: {
  field: ColorFieldDefinition;
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-10 w-20 p-1"
            style={{
              backgroundColor: value || "#000000",
              border: "2px solid #e5e7eb",
            }}
            type="button"
            disabled={field.disabled}
          >
            <span className="sr-only">Pick color</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <ColorPicker
            value={value || "#000000"}
            onChange={(newColor) => {
              onChange(newColor);
            }}
            className="h-auto w-full"
          >
            <ColorPickerSelection className="h-40 rounded-lg mb-3" />
            <ColorPickerHue className="mb-3" />
            <ColorPickerAlpha className="mb-3" />
            <div className="flex items-center gap-2">
              <ColorPickerEyeDropper />
              <ColorPickerOutput />
              <ColorPickerFormat />
            </div>
          </ColorPicker>
        </PopoverContent>
      </Popover>
      <Input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., #ffffff, rgba(0,0,0,0.5), hsla(0,0%,0%,0.5)"
        className="flex-1"
        disabled={field.disabled}
      />
    </div>
  );
}

function UrlField({
  field,
  value,
  onChange,
}: {
  field: UrlFieldDefinition;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Input
      type="url"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder || "https://..."}
      disabled={field.disabled}
    />
  );
}

function ArrayField({
  field,
  value,
  onChange,
}: {
  field: ArrayFieldDefinition;
  value: unknown[];
  onChange: (value: unknown[]) => void;
}) {
  const items = value || [];

  const addItem = () => {
    const defaultValue =
      field.itemType.defaultValue ?? getDefaultValue(field.itemType);
    onChange([...items, defaultValue]);
  };

  const updateItem = (index: number, newValue: unknown) => {
    const newItems = [...items];
    newItems[index] = newValue;
    onChange(newItems);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <Card key={index} className="relative">
          <CardContent className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 cursor-move text-muted-foreground" />
                <span className="text-sm font-medium">
                  {field.itemType.label} {index + 1}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => removeItem(index)}
                className="h-8 w-8 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <FieldRenderer
              field={field.itemType}
              value={item}
              onChange={(newValue) => updateItem(index, newValue)}
            />
          </CardContent>
        </Card>
      ))}
      {(!field.maxItems || items.length < field.maxItems) && (
        <Button variant="outline" size="sm" type="button" onClick={addItem}>
          <Plus className="mr-2 h-4 w-4" />
          Add {field.itemType.label}
        </Button>
      )}
    </div>
  );
}

function ObjectField({
  field,
  value,
  onChange,
}: {
  field: ObjectFieldDefinition;
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
}) {
  const objectValue = value || {};

  const updateField = (fieldName: string, fieldValue: unknown) => {
    onChange({
      ...objectValue,
      [fieldName]: fieldValue,
    });
  };

  return (
    <div className="space-y-4 rounded-lg border p-4">
      {field.fields.map((subField) => (
        <FieldWrapper key={subField.name} field={subField}>
          <FieldRenderer
            field={subField}
            value={objectValue[subField.name]}
            onChange={(newValue) => updateField(subField.name, newValue)}
          />
        </FieldWrapper>
      ))}
    </div>
  );
}

function GroupField({
  field,
  value,
  onChange,
}: {
  field: GroupFieldDefinition;
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
}) {
  const [isOpen, setIsOpen] = useState(!field.defaultCollapsed);
  const groupValue = value || {};

  const updateField = (fieldName: string, fieldValue: unknown) => {
    onChange({
      ...groupValue,
      [fieldName]: fieldValue,
    });
  };

  if (field.collapsible) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-lg border p-3 hover:bg-muted">
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <span className="font-medium">{field.label}</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-4 rounded-lg border p-4">
          {field.fields.map((subField) => (
            <FieldWrapper key={subField.name} field={subField}>
              <FieldRenderer
                field={subField}
                value={groupValue[subField.name]}
                onChange={(newValue) => updateField(subField.name, newValue)}
              />
            </FieldWrapper>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <div className="space-y-4">
      {field.fields.map((subField) => (
        <FieldWrapper key={subField.name} field={subField}>
          <FieldRenderer
            field={subField}
            value={groupValue[subField.name]}
            onChange={(newValue) => updateField(subField.name, newValue)}
          />
        </FieldWrapper>
      ))}
    </div>
  );
}

// ============================================
// FIELD WRAPPER - Label, description, required indicator
// ============================================

function FieldWrapper({
  field,
  children,
}: {
  field: FieldDefinition;
  children: React.ReactNode;
}) {
  if (field.hidden) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={field.name} className="text-sm font-medium">
          {field.label}
          {field.required && <span className="ml-1 text-destructive">*</span>}
        </Label>
      </div>
      {children}
      {field.description && (
        <p className="text-xs text-muted-foreground">{field.description}</p>
      )}
    </div>
  );
}

// ============================================
// GET DEFAULT VALUE HELPER
// ============================================

function getDefaultValue(field: FieldDefinition): unknown {
  if (field.defaultValue !== undefined) return field.defaultValue;

  switch (field.type) {
    case "text":
    case "textarea":
    case "richtext":
    case "url":
    case "color":
    case "image":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "select":
      return "";
    case "images":
    case "array":
      return [];
    case "object":
    case "group":
      return {};
    default:
      return "";
  }
}

// ============================================
// MAIN FIELD RENDERER
// ============================================

export function FieldRenderer({ field, value, onChange }: FieldRendererProps) {
  switch (field.type) {
    case "text":
      return (
        <TextField
          field={field as TextFieldDefinition}
          value={value as string}
          onChange={onChange as (v: string) => void}
        />
      );
    case "textarea":
      return (
        <TextareaField
          field={field as TextareaFieldDefinition}
          value={value as string}
          onChange={onChange as (v: string) => void}
        />
      );
    case "number":
      return (
        <NumberField
          field={field as NumberFieldDefinition}
          value={value as number}
          onChange={onChange as (v: number) => void}
        />
      );
    case "boolean":
      return (
        <BooleanField
          field={field as BooleanFieldDefinition}
          value={value as boolean}
          onChange={onChange as (v: boolean) => void}
        />
      );
    case "select":
      return (
        <SelectField
          field={field as SelectFieldDefinition}
          value={value as string}
          onChange={onChange as (v: string) => void}
        />
      );
    case "image":
      return (
        <ImageField
          field={field as ImageFieldDefinition}
          value={value as string}
          onChange={onChange as (v: string) => void}
        />
      );
    case "images":
      return (
        <ImagesField
          field={field as ImagesFieldDefinition}
          value={value as string[]}
          onChange={onChange as (v: string[]) => void}
        />
      );
    case "color":
      return (
        <ColorField
          field={field as ColorFieldDefinition}
          value={value as string}
          onChange={onChange as (v: string) => void}
        />
      );
    case "url":
      return (
        <UrlField
          field={field as UrlFieldDefinition}
          value={value as string}
          onChange={onChange as (v: string) => void}
        />
      );
    case "array":
      return (
        <ArrayField
          field={field as ArrayFieldDefinition}
          value={value as unknown[]}
          onChange={onChange as (v: unknown[]) => void}
        />
      );
    case "object":
      return (
        <ObjectField
          field={field as ObjectFieldDefinition}
          value={value as Record<string, unknown>}
          onChange={onChange as (v: Record<string, unknown>) => void}
        />
      );
    case "group":
      return (
        <GroupField
          field={field as GroupFieldDefinition}
          value={value as Record<string, unknown>}
          onChange={onChange as (v: Record<string, unknown>) => void}
        />
      );
    case "richtext":
      // For now, use textarea for rich text (can be enhanced later)
      return (
        <TextareaField
          field={
            { ...field, type: "textarea", rows: 6 } as TextareaFieldDefinition
          }
          value={value as string}
          onChange={onChange as (v: string) => void}
        />
      );
    default:
      return <div>Unknown field type</div>;
  }
}

// ============================================
// FORM RENDERER - Renders a complete form from fields
// ============================================

interface FormRendererProps {
  fields: FieldDefinition[];
  values: Record<string, unknown>;
  onChange: (values: Record<string, unknown>) => void;
}

export function FormRenderer({ fields, values, onChange }: FormRendererProps) {
  const handleFieldChange = (fieldName: string, fieldValue: unknown) => {
    onChange({
      ...values,
      [fieldName]: fieldValue,
    });
  };

  return (
    <div className="space-y-6">
      {fields.map((field) => (
        <FieldWrapper key={field.name} field={field}>
          <FieldRenderer
            field={field}
            value={values[field.name]}
            onChange={(newValue) => handleFieldChange(field.name, newValue)}
          />
        </FieldWrapper>
      ))}
    </div>
  );
}

export { getDefaultValue };
