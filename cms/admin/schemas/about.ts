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
        {
          name: "overlayColor",
          label: "Overlay Color",
          type: "color",
          description: "Color overlay on the background image (supports rgba)",
          defaultValue: "rgba(0, 0, 0, 0.5)",
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
          name: "sectionTitle",
          label: "Section Title",
          type: "text",
          description: "Small text above the heading",
          defaultValue: "About",
        },
        {
          name: "heading",
          label: "Heading",
          type: "text",
          required: true,
          defaultValue: "Our Philosophy",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          rows: 4,
          defaultValue:
            "We believe modern living is at its best when it is intentional and informed. Utter Lore creates space for clarity through thoughtful publishing, considered digital and content experiences, and flexible lifestyle essentials.",
        },
        {
          name: "items",
          label: "Philosophy Items",
          type: "array",
          description: "Key philosophy points (3 columns recommended)",
          itemType: {
            name: "philosophyItem",
            label: "Philosophy Item",
            type: "object",
            fields: [
              {
                name: "title",
                label: "Title",
                type: "text",
                required: true,
              },
              {
                name: "description",
                label: "Description",
                type: "textarea",
                rows: 3,
              },
            ],
          },
          defaultValue: [
            {
              title: "Knowledge with Intention",
              description:
                "Thoughtful publishing designed to inform, deepen understanding, and endure beyond trends.",
            },
            {
              title: "Clarity by Design",
              description:
                "Digital and content experiences, designed with clarity and purpose.",
            },
            {
              title: "Design that Adapts",
              description:
                "Flexible lifestyle essentials created to move with life and support everyday balance.",
            },
          ],
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
          name: "heading",
          label: "Heading",
          type: "text",
          defaultValue: "What We Do",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          rows: 4,
          defaultValue:
            "Utter Lore brings together knowledge, design, and intention to support thoughtful modern living.\nThrough Publishing, Digital, and FlexiBrez, we create content, experiences, and everyday essentials designed for clarity, balance, and long-term value.",
        },
        {
          name: "cardBackground",
          label: "Card Background",
          type: "text",
          description: "Background color or gradient for cards (e.g., #F9F4FF or radial-gradient(...))",
          defaultValue: "radial-gradient(43.04% 25.07% at 50% 50%, #F9F4FF 100%)",
        },
        {
          name: "cardTitleColor",
          label: "Card Title Color",
          type: "color",
          description: "Color for card titles",
          defaultValue: "#000000",
        },
        {
          name: "cardDescriptionColor",
          label: "Card Description Color",
          type: "color",
          description: "Color for card descriptions",
          defaultValue: "#212121",
        },
        {
          name: "iconBackgroundColor",
          label: "Icon Background Color",
          type: "color",
          description: "Background color for icon containers",
          defaultValue: "#69488F",
        },
        {
          name: "items",
          label: "Service Items",
          type: "array",
          description: "List of services (3 items recommended)",
          itemType: {
            name: "serviceItem",
            label: "Service Item",
            type: "object",
            fields: [
              {
                name: "title",
                label: "Title",
                type: "text",
                required: true,
              },
              {
                name: "description",
                label: "Description",
                type: "textarea",
                rows: 3,
              },
              {
                name: "iconSvg",
                label: "Icon SVG",
                type: "textarea",
                rows: 10,
                description: "Full SVG code for the icon",
              },
              {
                name: "isSpecial",
                label: "Is Special (FlexiBrez style)",
                type: "boolean",
                description: "Use special font for title (Brunella)",
                defaultValue: false,
              },
            ],
          },
          defaultValue: [
            {
              title: "Publishing Studio",
              description:
                "Thoughtful editorial content and resources designed to inform, inspire, and remain relevant over time.",
              isSpecial: false,
              iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20.625 18.6328C21.1406 18.8906 21.6055 19.207 22.0195 19.582C22.4336 19.957 22.7852 20.375 23.0742 20.8359C23.3633 21.2969 23.5898 21.7969 23.7539 22.3359C23.918 22.875 24 23.4297 24 24H22.5C22.5 23.3828 22.3828 22.8008 22.1484 22.2539C21.9141 21.707 21.5938 21.2305 21.1875 20.8242C20.7812 20.418 20.3008 20.0938 19.7461 19.8516C19.1914 19.6094 18.6094 19.4922 18 19.5C17.375 19.5 16.793 19.6172 16.2539 19.8516C15.7148 20.0859 15.2383 20.4062 14.8242 20.8125C14.4102 21.2188 14.0859 21.6992 13.8516 22.2539C13.6172 22.8086 13.5 23.3906 13.5 24H12C12 23.4297 12.0781 22.875 12.2344 22.3359C12.3906 21.7969 12.6172 21.2969 12.9141 20.8359C13.2109 20.375 13.5664 19.957 13.9805 19.582C14.3945 19.207 14.8594 18.8906 15.375 18.6328C14.7891 18.2109 14.332 17.6836 14.0039 17.0508C13.6758 16.418 13.5078 15.7344 13.5 15C13.5 14.3828 13.6172 13.8008 13.8516 13.2539C14.0859 12.707 14.4062 12.2305 14.8125 11.8242C15.2188 11.418 15.6953 11.0938 16.2422 10.8516C16.7891 10.6094 17.375 10.4922 18 10.5C18.6172 10.5 19.1992 10.6172 19.7461 10.8516C20.293 11.0859 20.7695 11.4062 21.1758 11.8125C21.582 12.2188 21.9062 12.6992 22.1484 13.2539C22.3906 13.8086 22.5078 14.3906 22.5 15C22.5 15.7344 22.3359 16.418 22.0078 17.0508C21.6797 17.6836 21.2188 18.2109 20.625 18.6328ZM18 18C18.4141 18 18.8008 17.9219 19.1602 17.7656C19.5195 17.6094 19.8398 17.3945 20.1211 17.1211C20.4023 16.8477 20.6172 16.5312 20.7656 16.1719C20.9141 15.8125 20.9922 15.4219 21 15C21 14.5859 20.9219 14.1992 20.7656 13.8398C20.6094 13.4805 20.3945 13.1602 20.1211 12.8789C19.8477 12.5977 19.5312 12.3828 19.1719 12.2344C18.8125 12.0859 18.4219 12.0078 18 12C17.5859 12 17.1992 12.0781 16.8398 12.2344C16.4805 12.3906 16.1602 12.6055 15.8789 12.8789C15.5977 13.1523 15.3828 13.4688 15.2344 13.8281C15.0859 14.1875 15.0078 14.5781 15 15C15 15.4141 15.0781 15.8008 15.2344 16.1602C15.3906 16.5195 15.6055 16.8398 15.8789 17.1211C16.1523 17.4023 16.4688 17.6172 16.8281 17.7656C17.1875 17.9141 17.5781 17.9922 18 18ZM12 18.9375C11.75 19.2266 11.5234 19.5273 11.3203 19.8398C11.1172 20.1523 10.9375 20.4883 10.7812 20.8477C10.3672 20.418 9.86719 20.0859 9.28125 19.8516C8.69531 19.6172 8.10156 19.5 7.5 19.5H3V4.5H1.5V21H10.7227C10.6133 21.2422 10.5234 21.4883 10.4531 21.7383C10.3828 21.9883 10.3242 22.2422 10.2773 22.5H0V3H3V1.5H7.5C8.1875 1.5 8.84766 1.60547 9.48047 1.81641C10.1133 2.02734 10.7031 2.34375 11.25 2.76562C11.7891 2.34375 12.375 2.02734 13.0078 1.81641C13.6406 1.60547 14.3047 1.5 15 1.5H19.5V3H22.5V10.5C22.0469 10.0547 21.5469 9.68359 21 9.38672V4.5H19.5V8.82422C19.25 8.75391 19 8.70312 18.75 8.67188C18.5 8.64062 18.25 8.625 18 8.625V3H15C14.4531 3 13.9219 3.09375 13.4062 3.28125C12.8906 3.46875 12.4219 3.74609 12 4.11328V18.9375ZM10.5 18.7852V4.11328C10.0781 3.75391 9.60938 3.48047 9.09375 3.29297C8.57812 3.10547 8.04688 3.00781 7.5 3H4.5V18H7.5C8.02344 18 8.53906 18.0664 9.04688 18.1992C9.55469 18.332 10.0391 18.5273 10.5 18.7852Z" fill="white"/></svg>',
            },
            {
              title: "Digital Studio",
              description:
                "End-to-end project design and content creation, delivering intentional digital experiences with clarity and purpose.",
              isSpecial: false,
              iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 8C4 5.172 4 3.757 5.004 2.879C6.008 2.001 7.624 2 10.857 2H13.143C16.375 2 17.992 2 18.996 2.879C20 3.757 20 5.172 20 8V17H4V8Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/><path d="M3 17H21" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M10.699 5.56602C11.929 5.39002 13.967 5.46002 12.28 7.15302C10.172 9.26802 7.008 14.029 10.699 12.443C14.389 10.855 15.971 11.913 14.389 13.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 17V21M5 22L8 17M19 22L16 17" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>',
            },
            {
              title: "FlexiBrez Studio",
              description:
                "Flexible lifestyle essentials created to adapt to everyday life and support ease, balance, and mindful use.",
              isSpecial: true,
              iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.4034 2.20541C12.357 2.14177 12.2962 2.09 12.226 2.0543C12.1558 2.01861 12.0782 2 11.9994 2C11.9206 2 11.843 2.01861 11.7728 2.0543C11.7026 2.09 11.6418 2.14177 11.5954 2.20541C11.5874 2.21591 11.3254 2.57641 11.0629 3.03541C10.9319 3.26441 10.7954 3.52741 10.6904 3.78991C10.5894 4.04291 10.4994 4.33891 10.4994 4.62141C10.4994 4.90341 10.5894 5.19941 10.6904 5.45241C10.7954 5.71491 10.9319 5.97741 11.0629 6.20691L11.1284 6.31991C10.9899 6.23095 10.8492 6.14542 10.7064 6.06341C10.4638 5.92172 10.2115 5.79724 9.95141 5.69091C9.69941 5.58991 9.40341 5.49991 9.12141 5.49991C8.83941 5.49991 8.54291 5.58991 8.28991 5.69091C8.02741 5.79591 7.76441 5.93241 7.53491 6.06341C7.07641 6.32591 6.71591 6.58841 6.70541 6.59591C6.64177 6.64231 6.59 6.70309 6.5543 6.7733C6.51861 6.8435 6.5 6.92115 6.5 6.99991C6.5 7.07867 6.51861 7.15631 6.5543 7.22652C6.59 7.29672 6.64177 7.35751 6.70541 7.40391C6.71591 7.41191 7.07641 7.67391 7.53541 7.93641C7.76441 8.06741 8.02741 8.20391 8.28991 8.30891C8.54291 8.40991 8.83891 8.49991 9.12141 8.49991C9.40341 8.49991 9.69941 8.40991 9.95241 8.30891C10.2123 8.20255 10.4644 8.07808 10.7069 7.93641C10.9789 7.78026 11.2433 7.61141 11.4994 7.43041V9.49991H8.99941C8.8668 9.49991 8.73962 9.55259 8.64585 9.64635C8.55209 9.74012 8.49941 9.8673 8.49941 9.99991C8.49941 10.1325 8.55209 10.2597 8.64585 10.3535C8.73962 10.4472 8.8668 10.4999 8.99941 10.4999H9.49941V12.6689C8.73918 13.1078 8.10791 13.7392 7.66906 14.4994C7.23021 15.2597 6.99926 16.1221 6.99941 16.9999C6.99941 19.7614 9.23791 21.9999 11.9994 21.9999C14.7609 21.9999 16.9994 19.7614 16.9994 16.9999C16.9996 16.1221 16.7686 15.2597 16.3298 14.4994C15.8909 13.7392 15.2596 13.1078 14.4994 12.6689V10.4999H14.9994C15.132 10.4999 15.2592 10.4472 15.353 10.3535C15.4467 10.2597 15.4994 10.1325 15.4994 9.99991C15.4994 9.8673 15.4467 9.74012 15.353 9.64635C15.2592 9.55259 15.132 9.49991 14.9994 9.49991H12.4994V7.43591C12.6104 7.51441 12.9154 7.72541 13.2844 7.93591C13.5139 8.06741 13.7769 8.20391 14.0394 8.30891C14.2924 8.40991 14.5884 8.49991 14.8709 8.49991C15.1529 8.49991 15.4489 8.40991 15.7019 8.30891C15.9618 8.20255 16.2139 8.07808 16.4564 7.93641C16.7417 7.77267 17.0187 7.59495 17.2864 7.40391C17.35 7.35751 17.4018 7.29672 17.4375 7.22652C17.4732 7.15631 17.4918 7.07867 17.4918 6.99991C17.4918 6.92115 17.4732 6.8435 17.4375 6.7733C17.4018 6.70309 17.35 6.64231 17.2864 6.59591C17.2754 6.58791 16.9154 6.32591 16.4564 6.06341C16.2138 5.92172 15.9615 5.79724 15.7014 5.69091C15.4494 5.58991 15.1534 5.49991 14.8714 5.49991C14.5894 5.49991 14.2929 5.58991 14.0399 5.69091C13.7774 5.79591 13.5144 5.93241 13.2849 6.06341C13.1349 6.14941 12.9954 6.23541 12.8749 6.31191L12.9364 6.20691C13.0674 5.97791 13.2039 5.71491 13.3089 5.45191C13.4099 5.19941 13.4999 4.90341 13.4999 4.62141C13.4999 4.33941 13.4099 4.04291 13.3089 3.78991C13.2026 3.52983 13.0781 3.27754 12.9364 3.03491C12.6739 2.57641 12.4109 2.21591 12.4034 2.20541ZM11.9314 3.53141L11.9994 3.41491L12.0679 3.53191C12.1859 3.73891 12.2979 3.95791 12.3799 4.16191C12.4649 4.37491 12.4994 4.52991 12.4994 4.62191C12.4994 4.71341 12.4649 4.86841 12.3794 5.08191C12.2984 5.28541 12.1859 5.50441 12.0679 5.71091L11.9994 5.82841L11.9309 5.71091C11.8129 5.50441 11.7009 5.28591 11.6189 5.08141C11.5339 4.86841 11.4994 4.71341 11.4994 4.62141C11.4994 4.52991 11.5339 4.37491 11.6194 4.16141C11.7004 3.95791 11.8129 3.73891 11.9309 3.53191M8.03091 7.06891L7.91441 6.99991L8.03141 6.93141C8.23841 6.81341 8.45741 6.70141 8.66141 6.61941C8.87441 6.53441 9.02941 6.49991 9.12141 6.49991C9.21291 6.49991 9.36791 6.53441 9.58141 6.61991C9.78491 6.70091 10.0039 6.81341 10.2104 6.93141L10.3279 6.99991L10.2104 7.06841C10.0039 7.18641 9.78541 7.29841 9.58091 7.38041C9.36791 7.46541 9.21291 7.49991 9.12091 7.49991C9.02941 7.49991 8.87441 7.46541 8.66091 7.37991C8.44403 7.29096 8.23368 7.18687 8.03141 7.06841M13.6644 6.99991L13.7814 7.06841C13.9884 7.18641 14.2074 7.29841 14.4114 7.38041C14.6244 7.46541 14.7794 7.49991 14.8714 7.49991C14.9629 7.49991 15.1179 7.46541 15.3314 7.37991C15.5349 7.29891 15.7539 7.18641 15.9604 7.06841L16.0779 6.99991L15.9604 6.93141C15.7539 6.81341 15.5354 6.70141 15.3309 6.61941C15.1179 6.53441 14.9629 6.49991 14.8709 6.49991C14.7794 6.49991 14.6244 6.53441 14.4109 6.61991C14.2074 6.70091 13.9884 6.81341 13.7814 6.93141L13.6644 6.99991ZM10.4994 10.4999H11.4994V15.4999H8.28991C8.62559 14.6729 9.22728 13.9813 9.99991 13.5344L10.4994 13.2454V10.4999ZM12.4994 10.4999V15.4999H15.7089C15.3732 14.6729 14.7715 13.9813 13.9989 13.5344L13.4994 13.2454V10.4999H12.4994ZM15.9684 16.4999H8.03041C7.95992 17.0628 8.00996 17.6342 8.17719 18.1762C8.34443 18.7182 8.62504 19.2185 9.0004 19.6438C9.37576 20.0691 9.83728 20.4097 10.3543 20.643C10.8714 20.8763 11.4322 20.9969 11.9994 20.9969C12.5667 20.9969 13.1274 20.8763 13.6445 20.643C14.1615 20.4097 14.6231 20.0691 14.9984 19.6438C15.3738 19.2185 15.6544 18.7182 15.8216 18.1762C15.9889 17.6342 16.0389 17.0628 15.9684 16.4999Z" fill="white"/></svg>',
            },
          ],
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
          name: "heading",
          label: "Heading",
          type: "text",
          defaultValue: "The Studio Values",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          rows: 4,
          defaultValue:
            "We bring research, thoughtful writing, and creative perspective together to define Utter Lore's editorial voice.",
        },
        {
          name: "iconBackground",
          label: "Icon Background",
          type: "text",
          description: "Background gradient or color for icon containers (e.g., radial-gradient(...) or #9A85B1)",
          defaultValue: "radial-gradient(50% 50% at 50% 50%, #9A85B1 0%, #3C1E66 100%)",
        },
        {
          name: "valueTitleColor",
          label: "Value Title Color",
          type: "color",
          description: "Color for value titles",
          defaultValue: "#000000",
        },
        {
          name: "values",
          label: "Values",
          type: "array",
          description: "List of core values (3-4 items recommended)",
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
                rows: 2,
              },
              {
                name: "iconSvg",
                label: "Icon SVG",
                type: "textarea",
                rows: 10,
                description: "Full SVG code for the icon (40x40 recommended)",
              },
            ],
          },
          defaultValue: [
            {
              title: "Clarity",
              iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M30.9617 2.5H20.625L27.2023 11.2703L30.9617 2.5ZM9.03828 2.5L12.7977 11.2703L19.375 2.5H9.03828ZM20 5.83359L15 12.5H25L20 5.83359ZM33.043 3.98906L29.3953 12.5H38.125L33.043 3.98906ZM6.95703 3.98906L1.79688 12.5H10.6047L6.95703 3.98906ZM11.4594 15H1.875L19.2812 37.5H19.3227L11.4594 15ZM28.5406 15L20.6773 37.5H20.7188L38.125 15H28.5406ZM25.7336 15H14.2664L20 31.25L25.7336 15Z" fill="white"/></svg>',
            },
            {
              title: "Design",
              iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M5.52693 27.1262C2.49693 30.1022 5.05693 33.1582 1.03293 37.6842C-0.783068 39.7302 8.50893 39.1062 13.1109 34.5822C15.0649 32.6602 14.5129 29.8642 12.4189 27.8042C10.3249 25.7482 7.47893 25.2042 5.52693 27.1262ZM39.0789 1.31821C37.5269 -0.209792 20.3209 13.5762 15.2009 18.6102C12.6589 21.1102 11.8109 22.4502 11.0329 23.4502C10.6929 23.8882 11.1429 24.0202 11.3409 24.1222C12.3489 24.6382 13.0529 25.1142 13.9629 26.0082C14.8749 26.9022 15.3609 27.5942 15.8809 28.5862C15.9869 28.7822 16.1229 29.2222 16.5649 28.8902C17.5849 28.1242 18.9469 27.2882 21.4889 24.7922C26.6109 19.7602 40.6349 2.84421 39.0789 1.31821Z" fill="white"/></svg>',
            },
            {
              title: "Intentional",
              iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M19.9987 3.3335C21.492 3.3335 22.9387 3.53016 24.3154 3.8985L20.772 7.44016C20.5032 7.71005 20.2661 8.00977 20.0654 8.3335H19.9987C17.6912 8.3335 15.4356 9.01773 13.517 10.2997C11.5985 11.5816 10.1031 13.4037 9.2201 15.5355C8.33708 17.6673 8.10604 20.0131 8.5562 22.2762C9.00636 24.5393 10.1175 26.6181 11.7491 28.2497C13.3807 29.8814 15.4595 30.9925 17.7226 31.4427C19.9858 31.8928 22.3315 31.6618 24.4633 30.7788C26.5951 29.8957 28.4172 28.4004 29.6992 26.4818C30.9811 24.5632 31.6654 22.3076 31.6654 20.0002V19.9335C31.9876 19.7335 32.2848 19.4974 32.557 19.2252L36.1004 15.6835C36.4687 17.0602 36.6654 18.5068 36.6654 20.0002C36.6654 29.2052 29.2037 36.6668 19.9987 36.6668C10.7937 36.6668 3.33203 29.2052 3.33203 20.0002C3.33203 10.7952 10.7937 3.3335 19.9987 3.3335ZM19.3087 11.6952C19.3087 13.1135 19.2387 14.5518 19.3154 15.9685L18.4154 16.8685C18.1058 17.1781 17.8602 17.5456 17.6926 17.9501C17.5251 18.3546 17.4389 18.7882 17.4389 19.226C17.4389 19.6638 17.5251 20.0974 17.6926 20.5019C17.8602 20.9064 18.1058 21.2739 18.4154 21.5835C18.725 21.8931 19.0925 22.1387 19.497 22.3062C19.9015 22.4738 20.335 22.56 20.7729 22.56C21.2107 22.56 21.6442 22.4738 22.0487 22.3062C22.4532 22.1387 22.8208 21.8931 23.1304 21.5835L24.0304 20.6835C25.447 20.7602 26.8837 20.6902 28.3037 20.6902C28.172 22.2741 27.5902 23.7873 26.6267 25.0513C25.6633 26.3154 24.3585 27.2776 22.8661 27.8244C21.3738 28.3713 19.7562 28.4799 18.2042 28.1376C16.6521 27.7953 15.2303 27.0163 14.1064 25.8924C12.9826 24.7686 12.2036 23.3468 11.8613 21.7947C11.5189 20.2426 11.6276 18.6251 12.1744 17.1327C12.7213 15.6404 13.6834 14.3356 14.9475 13.3721C16.2116 12.4087 17.7248 11.8268 19.3087 11.6952ZM30.8387 3.54516C31.1429 3.67129 31.4029 3.88472 31.586 4.15851C31.769 4.4323 31.8668 4.75417 31.867 5.0835V8.1335H34.9154C35.2449 8.13357 35.5671 8.23135 35.8411 8.41449C36.1151 8.59763 36.3287 8.85791 36.4548 9.16241C36.5809 9.4669 36.6139 9.80196 36.5497 10.1252C36.4854 10.4485 36.3267 10.7454 36.0937 10.9785L30.1987 16.8668C29.8862 17.1794 29.4624 17.3551 29.0204 17.3552H24.9987L21.952 20.4035C21.6393 20.7162 21.2151 20.8919 20.7729 20.8919C20.3306 20.8919 19.9064 20.7162 19.5937 20.4035C19.281 20.0908 19.1053 19.6666 19.1053 19.2243C19.1053 18.7821 19.281 18.3579 19.5937 18.0452L22.642 15.0002V10.9768C22.6419 10.7577 22.6849 10.5407 22.7687 10.3382C22.8525 10.1357 22.9754 9.95176 23.1304 9.79683L29.022 3.90516C29.2551 3.67194 29.5521 3.51309 29.8755 3.44872C30.1989 3.38434 30.5341 3.41732 30.8387 3.5435" fill="white"/></svg>',
            },
            {
              title: "Purposeful",
              iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M39.9388 8.07037C39.9117 7.61219 39.7174 7.17988 39.3929 6.85533C39.0683 6.53079 38.636 6.33655 38.1778 6.30943C29.8544 5.82037 23.1466 8.39693 20.2341 13.2063C18.3372 16.3313 18.2716 20.1079 20.006 23.7219C19.1617 24.7988 18.5124 26.0151 18.0872 27.3157L16.1091 25.3376C17.2325 22.7172 17.1138 20.0079 15.7341 17.7297C13.5497 14.1188 8.57472 12.1876 2.42784 12.5422C1.96941 12.5694 1.53689 12.7639 1.21231 13.0887C0.887725 13.4136 0.693655 13.8463 0.666904 14.3047C0.310654 20.4516 2.2419 25.4266 5.84972 27.611C7.07333 28.3568 8.47924 28.7499 9.91222 28.7469C11.1339 28.7371 12.3408 28.4782 13.4591 27.986L17.4982 32.0313V35.6251C17.4982 36.1223 17.6957 36.5993 18.0473 36.9509C18.399 37.3025 18.8759 37.5001 19.3732 37.5001C19.8704 37.5001 20.3473 37.3025 20.699 36.9509C21.0506 36.5993 21.2482 36.1223 21.2482 35.6251V31.0172C21.2443 29.3412 21.7626 27.7055 22.731 26.3376C24.2997 27.0807 26.0109 27.4746 27.7466 27.4922C29.6141 27.4965 31.4466 26.985 33.0419 26.0141C37.8497 23.1016 40.4294 16.3938 39.9388 8.07037ZM7.7919 24.4032C5.73097 23.1532 4.48253 20.1126 4.38097 16.2579C8.23565 16.3594 11.2778 17.6079 12.5263 19.6688C13.0145 20.4629 13.2148 21.4008 13.0935 22.3251L11.3232 20.5485C10.9709 20.1963 10.4932 19.9984 9.99503 19.9984C9.49689 19.9984 9.01915 20.1963 8.6669 20.5485C8.31466 20.9007 8.11678 21.3785 8.11678 21.8766C8.11678 22.3748 8.31466 22.8525 8.6669 23.2047L10.4388 24.9766C9.51702 25.0904 8.58391 24.8883 7.7919 24.4032ZM31.0997 22.8126C29.4341 23.8204 27.506 24.011 25.5044 23.4001L31.3247 17.5813C31.677 17.2291 31.8748 16.7513 31.8748 16.2532C31.8748 15.755 31.677 15.2773 31.3247 14.9251C30.9725 14.5728 30.4947 14.3749 29.9966 14.3749C29.4984 14.3749 29.0207 14.5728 28.6685 14.9251L22.8482 20.7438C22.2435 18.7501 22.4341 16.8141 23.4357 15.1563C25.42 11.8751 30.0997 10.0001 36.1419 10.0001H36.2482C36.27 16.0938 34.395 20.8094 31.0997 22.8126Z" fill="white"/></svg>',
            },
          ],
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
          defaultValue: "Mon Adams is a passionate writer and entrepreneur, driven by a desire to simplify the lifestyle of her readers and customers alike. She dreams of creating and providing articles that not only educate, but also genuinely improve people's lives. When she's not penning e-books on popular topics, you'll find her brainstorming novel ways to elevate businesses, connect entities and support audiences. Mon's commitments and her kind-hearted personality are deeply rooted in her writing and endeavours. She has an ultimate purpose – to succeed making a positive impact on the world.",
        },
        {
          name: "image",
          label: "Photo",
          type: "image",
          defaultValue: "/assets/images/mon-adams.png",
        },
        {
          name: "backgroundImage",
          label: "Background Image",
          type: "image",
          defaultValue: "/assets/images/mon-adams-back.png",
        },
        {
          name: "quote",
          label: "Quote",
          type: "text",
          defaultValue: "PURPOSEFUL BY DESIGN",
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
                name: "icon",
                label: "Icon Image URL",
                type: "text",
              },
              {
                name: "text",
                label: "Card Text",
                type: "text",
                required: true,
              },
              {
                name: "gradient",
                label: "Icon Background Gradient/Color",
                type: "text",
              },
            ],
          },
        },
        {
          name: "headingColor",
          label: "Heading Color",
          type: "color",
          defaultValue: "#000",
        },
        {
          name: "bioColor",
          label: "Bio Text Color",
          type: "color",
          defaultValue: "#212121",
        },
        {
          name: "cardTextColor",
          label: "Card Text Color",
          type: "color",
          defaultValue: "#1C1917",
        },
        {
          name: "cardBackgroundColor",
          label: "Card Background Color",
          type: "color",
          defaultValue: "#FFF",
        },
        {
          name: "cardBorderColor",
          label: "Card Border Color",
          type: "color",
          defaultValue: "rgba(231, 229, 228, 0.50)",
        },
        {
          name: "quoteColor",
          label: "Quote Color",
          type: "color",
          defaultValue: "#000",
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
          name: "heading",
          label: "Section Heading",
          type: "text",
          defaultValue: "How we work",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          defaultValue: "A thoughtful, collaborative process designed to bring clarity, creativity, and intention to every project",
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
                name: "iconSvg",
                label: "Icon SVG",
                type: "textarea",
                rows: 5,
              },
              {
                name: "title",
                label: "Step Title",
                type: "text",
                required: true,
              },
              {
                name: "subheading",
                label: "Subheading",
                type: "text",
              },
              {
                name: "description",
                label: "Description",
                type: "textarea",
              },
            ],
          },
        },
        {
          name: "headingColor",
          label: "Heading Color",
          type: "color",
          defaultValue: "#000",
        },
        {
          name: "descriptionColor",
          label: "Description Color",
          type: "color",
          defaultValue: "#212121",
        },
        {
          name: "stepTitleColor",
          label: "Step Title Color",
          type: "color",
          defaultValue: "#000",
        },
        {
          name: "stepSubheadingColor",
          label: "Step Subheading Color",
          type: "color",
          defaultValue: "#212121",
        },
        {
          name: "stepDescriptionColor",
          label: "Step Description Color",
          type: "color",
          defaultValue: "#212121",
        },
        {
          name: "iconContainerBackground",
          label: "Icon Container Background",
          type: "color",
          defaultValue: "#F5EDFF",
        },
        {
          name: "iconContainerBorderColor",
          label: "Icon Container Border Color",
          type: "color",
          defaultValue: "#DFC6FF",
        },
        {
          name: "iconColor",
          label: "Icon Color",
          type: "color",
          defaultValue: "#69488F",
        },
        {
          name: "arrowColor",
          label: "Arrow Color",
          type: "color",
          defaultValue: "#69488F",
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
