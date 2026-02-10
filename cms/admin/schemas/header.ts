import { PageSchema } from "@/types/schema";

export const headerSchema: PageSchema = {
  id: "header-config",
  name: "Header Configuration",
  slug: "/config/header",
  description: "Configure the site header/navbar",
  icon: "Layout",
  settings: {
    enableSectionReordering: false,
    enableSectionToggle: false,
  },
  sections: [
    {
      id: "header",
      name: "Header Settings",
      description: "Customize header logo, menu items, and styling",
      icon: "Menu",
      order: 0,
      enabled: true,
      fields: [
        // Logo Settings Group
        {
          name: "logo",
          label: "Logo Settings",
          type: "group",
          description: "Configure the site logo",
          fields: [
            {
              name: "image",
              label: "Logo Image",
              type: "image",
              description: "Upload logo image",
            },
            {
              name: "alt",
              label: "Logo Alt Text",
              type: "text",
              description: "Alternative text for the logo",
            },
            {
              name: "link",
              label: "Logo Link",
              type: "url",
              description: "Where the logo links to",
            },
          ],
        },

        // Header Position & Styling
        {
          name: "headerStyle",
          label: "Header Positioning",
          type: "group",
          description: "Configure header position and appearance",
          fields: [
            {
              name: "height",
              label: "Header Height",
              type: "text",
              description: "CSS height (e.g., 103px)",
            },
            {
              name: "paddingHorizontal",
              label: "Horizontal Padding",
              type: "text",
              description:
                "Responsive padding (e.g., 4px md:8px lg:12px xl:50px)",
            },
          ],
        },

        // Menu Items Array
        {
          name: "menuItems",
          label: "Menu Items",
          type: "array",
          description: "Add and configure navigation menu items",
          itemType: {
            name: "menuItem",
            label: "Menu Item",
            type: "group",
            fields: [
              {
                name: "label",
                label: "Label",
                type: "text",
                description: "Text displayed for the menu item",
                placeholder: "Home",
              },
              {
                name: "href",
                label: "Link",
                type: "url",
                description: "URL/path for the menu item",
                placeholder: "/",
              },
              {
                name: "isSpecial",
                label: "Special Styling",
                type: "boolean",
                description: "Apply Brunella font (for items like Flexi Brez)",
              },
            ],
          },
        },

        // Menu Styling
        {
          name: "menuStyle",
          label: "Menu Styling",
          type: "group",
          description: "Configure menu appearance",
          fields: [
            {
              name: "fontSize",
              label: "Font Size",
              type: "text",
              description: "Responsive (e.g., clamp(14px, 1.25vw, 20px))",
            },
            {
              name: "normalFontWeight",
              label: "Normal Font Weight",
              type: "select",
              options: [
                { label: "Light (300)", value: "300" },
                { label: "Normal (400)", value: "400" },
                { label: "Medium (500)", value: "500" },
                { label: "Semi-Bold (600)", value: "600" },
              ],
            },
            {
              name: "activeFontWeight",
              label: "Active Font Weight",
              type: "select",
              options: [
                { label: "Medium (500)", value: "500" },
                { label: "Semi-Bold (600)", value: "600" },
                { label: "Bold (700)", value: "700" },
              ],
            },
            {
              name: "textColor",
              label: "Text Color",
              type: "color",
            },
            {
              name: "activeUnderlineColor",
              label: "Active Underline Color",
              type: "color",
            },
            {
              name: "gap",
              label: "Gap Between Items",
              type: "text",
              description: "CSS gap (e.g., clamp(16px, 2vw, 32px))",
            },
          ],
        },

        // CTA Button Group
        {
          name: "ctaButton",
          label: "CTA Button",
          type: "group",
          description: "Configure the call-to-action button",
          fields: [
            {
              name: "enabled",
              label: "Show CTA Button",
              type: "boolean",
            },
            {
              name: "text",
              label: "Button Text",
              type: "text",
            },
            {
              name: "link",
              label: "Button Link",
              type: "url",
            },
            {
              name: "variant",
              label: "Button Variant",
              type: "select",
              options: [
                { label: "Primary", value: "primary" },
                { label: "Secondary", value: "secondary" },
              ],
            },
            {
              name: "showArrow",
              label: "Show Arrow",
              type: "boolean",
            },
            {
              name: "height",
              label: "Button Height",
              type: "number",
            },
            {
              name: "width",
              label: "Button Width",
              type: "number",
            },
          ],
        },

        // Cart Icon Group
        {
          name: "cartIcon",
          label: "Cart Icon",
          type: "group",
          description: "Configure shopping cart icon",
          fields: [
            {
              name: "enabled",
              label: "Show Cart Icon",
              type: "boolean",
            },
            {
              name: "iconColor",
              label: "Icon Color",
              type: "color",
            },
          ],
        },
      ],
    },
  ],
};
