import { PageSchema } from "@/types/schema";

export const landingPageSchema: PageSchema = {
  id: "landing-page",
  name: "Landing Page",
  slug: "/",
  description: "Home page of the website",
  icon: "Home",
  settings: {
    enableSectionReordering: true,
    enableSectionToggle: true,
  },
  sections: [
    {
      id: "hero",
      name: "Hero Section",
      description: "Main hero banner at the top of the page",
      icon: "Image",
      order: 0,
      enabled: true,
      fields: [
        {
          name: "sectionTitle",
          label: "Section Title",
          type: "text",
          description: "Small text above the main title (e.g., 'UTTER LORE')",
          placeholder: "Enter section title",
        },
        {
          name: "title",
          label: "Main Title",
          type: "text",
          description: "The main headline of the hero section",
          required: true,
          placeholder: "Enter main headline",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          description: "Supporting text below the title",
          rows: 3,
          placeholder: "Enter description text",
        },
        {
          name: "primaryButton",
          label: "Primary Button",
          type: "group",
          collapsible: true,
          fields: [
            {
              name: "text",
              label: "Button Text",
              type: "text",
              placeholder: "e.g., Explore Our Stories",
            },
            {
              name: "link",
              label: "Button Link",
              type: "url",
              placeholder: "/stories",
            },
            {
              name: "backgroundColor",
              label: "Background Color",
              type: "color",
              description: "Button background color",
              placeholder: "e.g., #000000 or rgba(0,0,0,1)",
            },
            {
              name: "textColor",
              label: "Text Color",
              type: "color",
              description: "Button text color",
              placeholder: "e.g., #FFFFFF or rgba(255,255,255,1)",
            },
            {
              name: "enabled",
              label: "Show Button",
              type: "boolean",
            },
          ],
        },
        {
          name: "secondaryButton",
          label: "Secondary Button",
          type: "group",
          collapsible: true,
          fields: [
            {
              name: "text",
              label: "Button Text",
              type: "text",
              placeholder: "e.g., Learn More",
            },
            {
              name: "link",
              label: "Button Link",
              type: "url",
              placeholder: "/about",
            },
            {
              name: "backgroundColor",
              label: "Background Color",
              type: "color",
              description: "Button background color",
              placeholder: "e.g., #FFFFFF or rgba(255,255,255,0.1)",
            },
            {
              name: "textColor",
              label: "Text Color",
              type: "color",
              description: "Button text color",
              placeholder: "e.g., #FFFFFF or rgba(255,255,255,1)",
            },
            {
              name: "borderColor",
              label: "Border Color",
              type: "color",
              description: "Button border color (for outline style)",
              placeholder: "e.g., #FFFFFF",
            },
            {
              name: "enabled",
              label: "Show Button",
              type: "boolean",
            },
          ],
        },
        {
          name: "backgroundImages",
          label: "Background Images",
          type: "images",
          description:
            "Images for the background carousel. Add multiple for slideshow effect.",
          maxItems: 10,
        },
        {
          name: "overlayColor",
          label: "Overlay Color",
          type: "color",
          description: "Color overlay on the background image",
        },
      ],
    },
    {
      id: "about-preview",
      name: "About Us Preview",
      description: "Brief about section on the landing page",
      icon: "Users",
      order: 1,
      enabled: true,
      fields: [
        {
          name: "sectionTitle",
          label: "Section Title",
          type: "text",
        },
        {
          name: "heading",
          label: "Heading",
          type: "text",
        },
        {
          name: "content",
          label: "Content Paragraphs",
          type: "array",
          description: "Add multiple paragraphs of content",
          itemType: {
            name: "paragraph",
            label: "Paragraph",
            type: "textarea",
            rows: 3,
          },
        },
        {
          name: "buttonText",
          label: "Button Text",
          type: "text",
        },
        {
          name: "buttonLink",
          label: "Button Link",
          type: "url",
        },
        {
          name: "image",
          label: "Image",
          type: "image",
        },
        {
          name: "imagePosition",
          label: "Image Position",
          type: "select",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
          defaultValue: "left",
        },
      ],
    },
  ],
};
