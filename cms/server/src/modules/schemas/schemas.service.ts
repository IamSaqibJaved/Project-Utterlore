import { Injectable } from "@nestjs/common";
import { PageSchema, SectionSchema } from "../../common/types";

@Injectable()
export class SchemasService {
  // In-memory storage for schemas
  private schemas: Map<string, PageSchema> = new Map();

  constructor() {
    this.initializeDefaultSchemas();
  }

  private initializeDefaultSchemas() {
    // Landing Page Schema
    const landingSchema: PageSchema = {
      id: "landing",
      name: "Landing Page",
      slug: "/",
      description: "Main landing page of the website",
      icon: "Home",
      sections: [
        {
          id: "hero",
          name: "Hero Section",
          description: "Main hero banner with title and call-to-action",
          icon: "Star",
          fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "subtitle", label: "Subtitle", type: "text" },
            { name: "ctaText", label: "CTA Button Text", type: "text" },
            { name: "ctaLink", label: "CTA Button Link", type: "url" },
            {
              name: "heroImage",
              label: "Hero Background Image",
              type: "image",
            },
            {
              name: "carouselImages",
              label: "Carousel Images",
              type: "array",
              itemType: { name: "image", label: "Image", type: "image" },
            },
          ],
        },
        {
          id: "about",
          name: "About Section",
          description: "About us preview section",
          icon: "Info",
          fields: [
            { name: "sectionTitle", label: "Section Title", type: "text" },
            { name: "heading", label: "Heading", type: "text" },
            { name: "content", label: "Content", type: "textarea", rows: 4 },
            { name: "buttonText", label: "Button Text", type: "text" },
            { name: "buttonLink", label: "Button Link", type: "url" },
            { name: "image", label: "Image", type: "image" },
          ],
        },
      ],
      settings: {
        enableSectionReordering: true,
        enableSectionToggle: true,
      },
    };

    // About Page Schema
    const aboutSchema: PageSchema = {
      id: "about",
      name: "About Page",
      slug: "/about",
      description: "About us page with company information",
      icon: "Users",
      sections: [
        {
          id: "hero",
          name: "Hero Section",
          description: "About page hero banner",
          icon: "Star",
          fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "subtitle", label: "Subtitle", type: "text" },
            {
              name: "backgroundImage",
              label: "Background Image",
              type: "image",
            },
          ],
        },
        {
          id: "philosophy",
          name: "Philosophy Section",
          description: "Company philosophy and mission",
          icon: "Lightbulb",
          fields: [
            { name: "title", label: "Title", type: "text" },
            { name: "content", label: "Content", type: "richtext" },
          ],
        },
        {
          id: "whatWeDo",
          name: "What We Do Section",
          description: "Services overview",
          icon: "Briefcase",
          fields: [
            { name: "title", label: "Title", type: "text" },
            {
              name: "services",
              label: "Services",
              type: "array",
              itemType: {
                name: "service",
                label: "Service",
                type: "object",
                fields: [
                  { name: "title", label: "Service Title", type: "text" },
                  {
                    name: "description",
                    label: "Description",
                    type: "textarea",
                  },
                  { name: "icon", label: "Icon", type: "text" },
                ],
              },
            },
          ],
        },
        {
          id: "studioValues",
          name: "Studio Values Section",
          description: "Company core values",
          icon: "Heart",
          fields: [
            { name: "title", label: "Title", type: "text" },
            {
              name: "values",
              label: "Values",
              type: "array",
              itemType: {
                name: "value",
                label: "Value",
                type: "object",
                fields: [
                  { name: "title", label: "Value Title", type: "text" },
                  {
                    name: "description",
                    label: "Description",
                    type: "textarea",
                  },
                ],
              },
            },
          ],
        },
        {
          id: "monAdams",
          name: "Quote Section",
          description: "Featured quote",
          icon: "Quote",
          fields: [
            { name: "quote", label: "Quote", type: "textarea", rows: 3 },
            { name: "author", label: "Author", type: "text" },
            { name: "authorTitle", label: "Author Title", type: "text" },
            { name: "image", label: "Author Image", type: "image" },
          ],
        },
        {
          id: "howWeWork",
          name: "How We Work Section",
          description: "Work process steps",
          icon: "GitBranch",
          fields: [
            { name: "title", label: "Title", type: "text" },
            {
              name: "steps",
              label: "Steps",
              type: "array",
              itemType: {
                name: "step",
                label: "Step",
                type: "object",
                fields: [
                  { name: "number", label: "Step Number", type: "text" },
                  { name: "title", label: "Step Title", type: "text" },
                  {
                    name: "description",
                    label: "Description",
                    type: "textarea",
                  },
                ],
              },
            },
          ],
        },
      ],
      settings: {
        enableSectionReordering: true,
        enableSectionToggle: true,
      },
    };

    this.schemas.set("landing", landingSchema);
    this.schemas.set("about", aboutSchema);
  }

  // ============================================
  // CRUD OPERATIONS
  // ============================================

  async findAll(): Promise<PageSchema[]> {
    return Array.from(this.schemas.values());
  }

  async findOne(id: string): Promise<PageSchema | null> {
    return this.schemas.get(id) || null;
  }

  async findBySlug(slug: string): Promise<PageSchema | null> {
    for (const schema of this.schemas.values()) {
      if (schema.slug === slug) {
        return schema;
      }
    }
    return null;
  }

  async create(schema: PageSchema): Promise<PageSchema> {
    this.schemas.set(schema.id, schema);
    return schema;
  }

  async update(
    id: string,
    updates: Partial<PageSchema>,
  ): Promise<PageSchema | null> {
    const schema = this.schemas.get(id);
    if (!schema) return null;

    const updatedSchema = { ...schema, ...updates };
    this.schemas.set(id, updatedSchema);
    return updatedSchema;
  }

  async delete(id: string): Promise<boolean> {
    return this.schemas.delete(id);
  }

  // ============================================
  // SECTION OPERATIONS
  // ============================================

  async findSection(
    schemaId: string,
    sectionId: string,
  ): Promise<SectionSchema | null> {
    const schema = this.schemas.get(schemaId);
    if (!schema) return null;

    return schema.sections.find((s) => s.id === sectionId) || null;
  }

  async updateSection(
    schemaId: string,
    sectionId: string,
    updates: Partial<SectionSchema>,
  ): Promise<SectionSchema | null> {
    const schema = this.schemas.get(schemaId);
    if (!schema) return null;

    const sectionIndex = schema.sections.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return null;

    const updatedSection = { ...schema.sections[sectionIndex], ...updates };
    schema.sections[sectionIndex] = updatedSection;
    this.schemas.set(schemaId, schema);

    return updatedSection;
  }
}
