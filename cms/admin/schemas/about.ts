import { PageSchema } from "@/types/schema";

export const aboutPageSchema: PageSchema = {
  id: "about-page",
  name: "About Us Page",
  slug: "/about",
  description: "About page with company information and values",
  icon: "Users",
  settings: {
    enableSectionReordering: true,
    enableSectionToggle: true,
  },
  sections: [
    {
      id: "hero",
      name: "Hero Section",
      description: "About page hero banner",
      icon: "Image",
      order: 0,
      enabled: true,
      fields: [
        {
          name: "sectionTitle",
          label: "Section Title",
          type: "text",
          defaultValue: "UTTER LORE",
        },
        {
          name: "title",
          label: "Main Title",
          type: "text",
          required: true,
          defaultValue:
            "Where Insight, Design and Intention Shape Modern Living",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          rows: 4,
          defaultValue:
            "Utter Lore is a considered space for modern living, shaped by knowledge, design, and intention. We create thoughtful content, considered digital and e-commerce experiences, and flexible lifestyle essentials.",
        },
        {
          name: "descriptionMaxWidth",
          label: "Description Max Width",
          type: "number",
          description: "Maximum width of description in pixels",
          min: 300,
          max: 1200,
          defaultValue: 885,
        },
        {
          name: "backgroundImages",
          label: "Background Images",
          type: "images",
          maxItems: 10,
        },
      ],
    },
    {
      id: "philosophy",
      name: "Philosophy Section",
      description: "Our philosophy and approach",
      icon: "Lightbulb",
      order: 1,
      enabled: true,
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          defaultValue: "Our Philosophy",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          rows: 4,
        },
        {
          name: "image",
          label: "Image",
          type: "image",
        },
        {
          name: "layout",
          label: "Layout",
          type: "select",
          options: [
            { label: "Image Left", value: "image-left" },
            { label: "Image Right", value: "image-right" },
            { label: "Image Top", value: "image-top" },
            { label: "Centered", value: "centered" },
          ],
          defaultValue: "image-left",
        },
      ],
    },
    {
      id: "what-we-do",
      name: "What We Do Section",
      description: "Our services and offerings",
      icon: "Briefcase",
      order: 2,
      enabled: true,
      fields: [
        {
          name: "title",
          label: "Section Title",
          type: "text",
          defaultValue: "What We Do",
        },
        {
          name: "description",
          label: "Section Description",
          type: "textarea",
        },
        {
          name: "services",
          label: "Services",
          type: "array",
          description: "List of services/offerings",
          itemType: {
            name: "service",
            label: "Service",
            type: "object",
            fields: [
              {
                name: "title",
                label: "Service Title",
                type: "text",
                required: true,
              },
              {
                name: "description",
                label: "Description",
                type: "textarea",
              },
              {
                name: "icon",
                label: "Icon",
                type: "text",
                description: "Icon name from Lucide icons",
              },
              {
                name: "image",
                label: "Image",
                type: "image",
              },
              {
                name: "link",
                label: "Link",
                type: "url",
              },
            ],
          },
        },
      ],
    },
    {
      id: "studio-values",
      name: "Studio Values Section",
      description: "Core values and principles",
      icon: "Heart",
      order: 3,
      enabled: true,
      fields: [
        {
          name: "title",
          label: "Section Title",
          type: "text",
          defaultValue: "Our Values",
        },
        {
          name: "values",
          label: "Values",
          type: "array",
          itemType: {
            name: "value",
            label: "Value",
            type: "object",
            fields: [
              {
                name: "title",
                label: "Value Title",
                type: "text",
                required: true,
              },
              {
                name: "description",
                label: "Description",
                type: "textarea",
              },
              {
                name: "icon",
                label: "Icon",
                type: "text",
              },
            ],
          },
        },
      ],
    },
    {
      id: "mon-adams",
      name: "Mon Adams Section",
      description: "Founder/team member spotlight",
      icon: "User",
      order: 4,
      enabled: true,
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          defaultValue: "Mon Adams",
        },
        {
          name: "title",
          label: "Title/Role",
          type: "text",
          defaultValue: "Founder & Creative Director",
        },
        {
          name: "bio",
          label: "Biography",
          type: "textarea",
          rows: 5,
        },
        {
          name: "image",
          label: "Photo",
          type: "image",
        },
        {
          name: "quote",
          label: "Quote",
          type: "textarea",
        },
        {
          name: "layout",
          label: "Layout",
          type: "select",
          options: [
            { label: "Image Left", value: "image-left" },
            { label: "Image Right", value: "image-right" },
            { label: "Centered", value: "centered" },
          ],
          defaultValue: "image-right",
        },
      ],
    },
    {
      id: "how-we-work",
      name: "How We Work Section",
      description: "Our process and methodology",
      icon: "Workflow",
      order: 5,
      enabled: true,
      fields: [
        {
          name: "title",
          label: "Section Title",
          type: "text",
          defaultValue: "How We Work",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
        },
        {
          name: "steps",
          label: "Process Steps",
          type: "array",
          itemType: {
            name: "step",
            label: "Step",
            type: "object",
            fields: [
              {
                name: "number",
                label: "Step Number",
                type: "text",
              },
              {
                name: "title",
                label: "Step Title",
                type: "text",
                required: true,
              },
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
      id: "studio-cards",
      name: "Studio Cards Section",
      description: "Feature cards or highlights",
      icon: "LayoutGrid",
      order: 6,
      enabled: true,
      fields: [
        {
          name: "title",
          label: "Section Title",
          type: "text",
        },
        {
          name: "cards",
          label: "Cards",
          type: "array",
          itemType: {
            name: "card",
            label: "Card",
            type: "object",
            fields: [
              {
                name: "title",
                label: "Card Title",
                type: "text",
                required: true,
              },
              {
                name: "description",
                label: "Description",
                type: "textarea",
              },
              {
                name: "image",
                label: "Image",
                type: "image",
              },
              {
                name: "link",
                label: "Link",
                type: "url",
              },
              {
                name: "linkText",
                label: "Link Text",
                type: "text",
                defaultValue: "Learn More",
              },
            ],
          },
        },
        {
          name: "columns",
          label: "Columns",
          type: "select",
          options: [
            { label: "2 Columns", value: "2" },
            { label: "3 Columns", value: "3" },
            { label: "4 Columns", value: "4" },
          ],
          defaultValue: "3",
        },
      ],
    },
  ],
};
