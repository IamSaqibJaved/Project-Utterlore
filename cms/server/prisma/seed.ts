import { PrismaClient } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

// Section type for seed data
interface SeedSection {
  sectionId: string;
  enabled: boolean;
  order: number;
  data: Record<string, unknown>;
}

interface SeedPageData {
  schemaId: string;
  slug: string;
  title: string;
  description: string;
  modifiedBy: string;
  sections: SeedSection[];
}

// ============================================
// SEED DATA - Landing Page
// ============================================

// const landingPageData: SeedPageData = {
//   schemaId: "landing-page",
//   slug: "/",
//   title: "UtterLore - Home",
//   description: "Where design meets storytelling",
//   modifiedBy: "admin",
//   sections: [
//     {
//       sectionId: "hero",
//       enabled: true,
//       order: 0,
//       data: {
//         sectionTitle: "UTTER LORE",
//         title: "EMPOWERING KNOWLEDGE FOR THE MINDFUL COLLECTIVES",
//         description:
//           "Where design meets storytelling. Explore insights, ideas, and reflections across beauty, fashion, and lifestyle.",
//         primaryButton: {
//           text: "Explore Our Stories",
//           link: "/stories",
//           enabled: true,
//         },
//         secondaryButton: {
//           text: "",
//           link: "",
//           enabled: false,
//         },
//         backgroundImages: [
//           "https://res.cloudinary.com/dnh7x7r5j/image/upload/v1768154458/CarasoulWallpaper_ls56hr.jpg",
//         ],
//         overlayColor: "rgba(0, 0, 0, 0.5)",
//       },
//     },
//     {
//       sectionId: "about-preview",
//       enabled: true,
//       order: 1,
//       data: {
//         sectionTitle: "About",
//         heading: "UTTER LORE",
//         content: [
//           "Utter Lore stands as a visionary entity, seamlessly blending creativity with purpose to craft experiences that transcend the ordinary. Rooted in the philosophy of elevating everyday life through design, beauty, and storytelling, Utter Lore embodies an unwavering commitment to authenticity and innovation.",
//           "From curated fashion insights and thoughtful lifestyle narratives to transformative beauty explorations, Utter Lore redefines the way we engage with the world around us. Each endeavor is meticulously designed to inspire, educate, and empower individuals to embrace their unique journeys with confidence and clarity.",
//           "At its core, Utter Lore is not just a brand—it is a movement. A celebration of meaningful creativity that bridges the gap between aspiration and reality, offering a sanctuary for those seeking depth, elegance, and purpose in all they pursue.",
//         ],
//         buttonText: "Read Our Story",
//         buttonLink: "/about",
//         image:
//           "https://res.cloudinary.com/dnh7x7r5j/image/upload/v1768154458/AboutUs_placeholder.jpg",
//         imagePosition: "left",
//       },
//     },
//   ],
// };

// ============================================
// SEED DATA - About Page
// ============================================

const aboutPageData: SeedPageData = {
  schemaId: "about-page",
  slug: "/about",
  title: "About Us - UtterLore",
  description: "Learn about our philosophy, values, and team",
  modifiedBy: "admin",
  sections: [
    {
      sectionId: "hero",
      enabled: true,
      order: 0,
      data: {
        sectionTitle: "UTTER LORE",
        title: "Where Insight, Design and Intention Shape Modern Living",
        description:
          "Utter Lore is a considered space for modern living, shaped by knowledge, design, and intention. We create thoughtful content, considered digital and e-commerce experiences, and flexible lifestyle essentials. Each element is designed to support clarity, balance, and mindful living.",
        descriptionMaxWidth: 885,
        backgroundImages: ["https://res.cloudinary.com/dnh7x7r5j/image/upload/v1768154458/CarasoulWallpaper_ls56hr.jpg"],
        overlayColor: "#180330B2",
      },
    },
    {
      sectionId: "philosophy",
      enabled: true,
      order: 1,
      data: {
        sectionTitle: "About",
        heading: "Our Philosophy",
        description:
          "We believe modern living is at its best when it is intentional and informed. Utter Lore creates space for clarity through thoughtful publishing, considered digital and content experiences, and flexible lifestyle essentials. Guided by purpose rather than trends, we offer perspective, supporting balance, reflection, and mindful living shaped daily with intention.",
        items: [
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
    },
    {
      sectionId: "what-we-do",
      enabled: true,
      order: 2,
      data: {
        heading: "What We Do",
        description:
          "Utter Lore brings together knowledge, design, and intention to support thoughtful modern living.\nThrough Publishing, Digital, and FlexiBrez, we create content, experiences, and everyday essentials designed for clarity, balance, and long-term value.",
        cardBackground: "radial-gradient(43.04% 25.07% at 50% 50%, #F9F4FF 100%)",
        cardTitleColor: "#000000",
        cardDescriptionColor: "#212121",
        iconBackgroundColor: "#69488F",
        items: [
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
    },
    {
      sectionId: "studio-values",
      enabled: true,
      order: 3,
      data: {
        heading: "The Studio Values",
        description:
          "We bring research, thoughtful writing, and creative perspective together to define Utter Lore's editorial voice.",
        iconBackground: "radial-gradient(50% 50% at 50% 50%, #9A85B1 0%, #3C1E66 100%)",
        valueTitleColor: "#000000",
        values: [
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
    },
    {
      sectionId: "mon-adams",
      enabled: true,
      order: 4,
      data: {
        name: "Mon Adams",
        title: "Founder & Creative Director",
        bio: "Mon Adams is a passionate writer and entrepreneur, driven by a desire to simplify the lifestyle of her readers and customers alike. She dreams of creating and providing articles that not only educate, but also genuinely improve people's lives. When she's not penning e-books on popular topics, you'll find her brainstorming novel ways to elevate businesses, connect entities and support audiences. Mon's commitments and her kind-hearted personality are deeply rooted in her writing and endeavours. She has an ultimate purpose – to succeed making a positive impact on the world.",
        image: "/assets/images/mon-adams.png",
        backgroundImage: "/assets/images/mon-adams-back.png",
        quote: "PURPOSEFUL BY DESIGN",
        cards: [
          {
            icon: "https://res.cloudinary.com/dnh7x7r5j/image/upload/v1770659732/skincare_monadams_ftqgko.png",
            text: "Skincare that works",
            gradient: "linear-gradient(135deg, #FCE7F3 0%, #FCCEE8 100%)",
          },
          {
            icon: "https://res.cloudinary.com/dnh7x7r5j/image/upload/v1770659732/premium-quality_mon-adams_aqp4hj.png",
            text: "Home essentials",
            gradient: "linear-gradient(135deg, #FEF3C6 0%, #FEE685 100%)",
          },
          {
            icon: "https://res.cloudinary.com/dnh7x7r5j/image/upload/v1770659732/light-bulb_monadams_hovxaz.png",
            text: "Tech that blends in",
            gradient: "linear-gradient(135deg, #E0E7FF 0%, #C6D2FF 100%)",
          },
          {
            icon: "https://res.cloudinary.com/dnh7x7r5j/image/upload/v1770659732/fashion_monadams_djgzhs.png",
            text: "Fashion that lasts",
            gradient: "linear-gradient(135deg, #F3E8FF 0%, #E9D4FF 100%)",
          },
        ],
        headingColor: "#000",
        bioColor: "#212121",
        cardTextColor: "#1C1917",
        cardBackgroundColor: "#FFF",
        cardBorderColor: "rgba(231, 229, 228, 0.50)",
        quoteColor: "#000",
      },
    },
    {
      sectionId: "how-we-work",
      enabled: true,
      order: 5,
      data: {
        heading: "How we work",
        description:
          "A thoughtful, collaborative process designed to bring clarity, creativity, and intention to every project",
        steps: [
          {
            iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none"><path d="M7.125 20.1875H16.625V22.5625H7.125V20.1875Z" fill="#69488F"/><path d="M3.5625 22.5625C4.21834 22.5625 4.75 22.0308 4.75 21.375C4.75 20.7192 4.21834 20.1875 3.5625 20.1875C2.90666 20.1875 2.375 20.7192 2.375 21.375C2.375 22.0308 2.90666 22.5625 3.5625 22.5625Z" fill="#69488F"/><path d="M15.4375 17.8125C16.0933 17.8125 16.625 17.2808 16.625 16.625C16.625 15.9692 16.0933 15.4375 15.4375 15.4375C14.7817 15.4375 14.25 15.9692 14.25 16.625C14.25 17.2808 14.7817 17.8125 15.4375 17.8125Z" fill="#69488F"/><path d="M2.375 15.4375H11.875V17.8125H2.375V15.4375ZM7.125 10.6875H16.625V13.0625H7.125V10.6875Z" fill="#69488F"/><path d="M3.5625 13.0625C4.21834 13.0625 4.75 12.5308 4.75 11.875C4.75 11.2192 4.21834 10.6875 3.5625 10.6875C2.90666 10.6875 2.375 11.2192 2.375 11.875C2.375 12.5308 2.90666 13.0625 3.5625 13.0625Z" fill="#69488F"/><path d="M35.6242 33.9625L26.8367 25.175C28.618 22.8 29.6867 19.8312 29.6867 16.625C29.6867 8.7875 23.2742 2.375 15.4367 2.375C11.518 2.375 7.83672 3.91875 5.10547 6.8875L6.88672 8.55C9.02422 6.05625 12.1117 4.75 15.4367 4.75C21.968 4.75 27.3117 10.0938 27.3117 16.625C27.3117 23.1562 21.968 28.5 15.4367 28.5C11.8742 28.5 8.54922 26.9562 6.29297 24.225L4.51172 25.7688C7.12422 28.975 11.1617 30.875 15.4367 30.875C19.2367 30.875 22.6805 29.3313 25.293 26.9563L33.9617 35.625L35.6242 33.9625Z" fill="#69488F"/></svg>',
            title: "Begin with Understanding",
            subheading: "Research-led and reflective",
            description:
              "We start with context, insight, and intention — ensuring everything we create is informed, considered, and grounded in purpose.",
          },
          {
            iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none"><path d="M10.1415 4.92553C10.1374 4.73953 10.0809 4.55847 9.97853 4.40312C9.87616 4.24777 9.73208 4.12442 9.56281 4.04722C9.39354 3.97002 9.20594 3.94211 9.02152 3.96667C8.83711 3.99124 8.66336 4.06729 8.5202 4.18611C6.62178 5.76153 5.46516 6.96644 4.7962 8.07319C4.09003 9.23615 3.95703 10.236 3.95703 11.2787C3.95703 12.4334 4.41577 13.5409 5.23234 14.3575C6.0489 15.1741 7.1564 15.6328 8.3112 15.6328C9.46599 15.6328 10.5735 15.1741 11.3901 14.3575C12.2066 13.5409 12.6654 12.4334 12.6654 11.2787C12.6654 9.85761 11.9608 8.8989 11.4066 8.14603L11.2459 7.92594C10.6727 7.13111 10.1732 6.33707 10.1415 4.92553ZM13.3889 8.24894C14.3996 7.76854 15.5047 7.51972 16.6237 7.52061C20.51 7.52061 23.7075 10.468 24.1034 14.2498H20.7799C19.4677 14.2498 18.2092 14.7711 17.2812 15.699C16.3533 16.6269 15.832 17.8854 15.832 19.1977V22.5211C15.2762 22.4635 14.7286 22.3435 14.1996 22.1633C14.1607 22.8382 14.1058 23.5121 14.0349 24.1844C14.6144 24.3491 15.2135 24.4573 15.832 24.509V27.5102C15.832 28.8225 16.3533 30.081 17.2812 31.0089C18.2092 31.9368 19.4677 32.4581 20.7799 32.4581H29.0924C30.4047 32.4581 31.6632 31.9368 32.5912 31.0089C33.5191 30.081 34.0404 28.8225 34.0404 27.5102V19.1977C34.0404 17.8854 33.5191 16.6269 32.5912 15.699C31.6632 14.7711 30.4047 14.2498 29.0924 14.2498H26.0912C25.6891 9.37311 21.6041 5.54144 16.6229 5.54144C15.1026 5.53917 13.6042 5.90333 12.2545 6.60307C12.3376 6.73132 12.4294 6.86194 12.53 7.00128L12.6804 7.20473C12.8783 7.46994 13.1388 7.81907 13.3897 8.24973M26.0493 16.2289H29.0917C29.879 16.2289 30.6341 16.5417 31.1909 17.0985C31.7476 17.6552 32.0604 18.4103 32.0604 19.1977V27.5102C32.0604 28.2976 31.7476 29.0527 31.1909 29.6094C30.6341 30.1662 29.879 30.4789 29.0917 30.4789H20.7792C19.9918 30.4789 19.2367 30.1662 18.6799 29.6094C18.1232 29.0527 17.8104 28.2976 17.8104 27.5102V24.4678C19.9032 24.2035 21.8487 23.2505 23.3403 21.7589C24.8319 20.2672 25.785 18.3218 26.0493 16.2289ZM24.0503 16.2289C23.7991 17.7933 23.0608 19.2386 21.9404 20.359C20.8201 21.4793 19.3748 22.2177 17.8104 22.4689V19.1977C17.8104 18.4103 18.1232 17.6552 18.6799 17.0985C19.2367 16.5417 19.9918 16.2289 20.7792 16.2289H24.0503ZM4.61491 16.3612C4.66082 16.254 4.71043 16.1474 4.76374 16.0413C5.78806 16.8063 7.03272 17.2188 8.3112 17.2169C9.59076 17.2187 10.8364 16.8053 11.861 16.0389C11.9149 16.1456 11.965 16.2535 12.0114 16.3627C12.5656 17.6682 12.6654 19.2642 12.6654 20.5412C12.6654 22.6312 12.3424 25.8295 11.7502 28.5212C11.4549 29.8614 11.0812 31.1336 10.6181 32.0939C10.3885 32.5713 10.1107 33.0257 9.76866 33.3733C9.42428 33.7232 8.93582 34.0414 8.31436 34.0414C7.69291 34.0414 7.20445 33.724 6.86007 33.3741C6.51807 33.0257 6.2402 32.5721 6.00982 32.0947C5.54591 31.1344 5.17066 29.8622 4.87536 28.5219C4.28161 25.8303 3.95703 22.6319 3.95703 20.5412C3.95703 19.2634 4.05836 17.6674 4.61491 16.3612Z" fill="#69488F"/></svg>',
            title: "Design Holistically",
            subheading: "End-to-end thinking",
            description:
              "From ideas to execution, we shape structure, content, and experience together, creating work that feels clear, cohesive, and intentional.",
          },
          {
            iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none"><path d="M24.9375 27.3125C26.2492 27.3125 27.3125 26.2492 27.3125 24.9375C27.3125 23.6258 26.2492 22.5625 24.9375 22.5625C23.6258 22.5625 22.5625 23.6258 22.5625 24.9375C22.5625 26.2492 23.6258 27.3125 24.9375 27.3125Z" fill="#69488F"/><path d="M8.3125 10.6875C9.62418 10.6875 10.6875 9.62418 10.6875 8.3125C10.6875 7.00082 9.62418 5.9375 8.3125 5.9375C7.00082 5.9375 5.9375 7.00082 5.9375 8.3125C5.9375 9.62418 7.00082 10.6875 8.3125 10.6875Z" fill="#69488F"/><path d="M32.0625 36.8125C31.123 36.8125 30.2047 36.5339 29.4235 36.012C28.6424 35.49 28.0336 34.7482 27.6741 33.8802C27.3146 33.0123 27.2205 32.0572 27.4038 31.1358C27.5871 30.2144 28.0394 29.368 28.7037 28.7037C29.368 28.0394 30.2144 27.5871 31.1358 27.4038C32.0572 27.2205 33.0123 27.3146 33.8802 27.6741C34.7482 28.0336 35.49 28.6424 36.012 29.4235C36.5339 30.2047 36.8125 31.123 36.8125 32.0625C36.8094 33.3213 36.3079 34.5277 35.4178 35.4178C34.5277 36.3079 33.3213 36.8094 32.0625 36.8125ZM32.0625 29.6875C31.5928 29.6875 31.1336 29.8268 30.743 30.0878C30.3525 30.3487 30.048 30.7197 29.8683 31.1536C29.6885 31.5876 29.6415 32.0651 29.7331 32.5258C29.8248 32.9865 30.051 33.4097 30.3831 33.7419C30.7153 34.074 31.1385 34.3002 31.5992 34.3919C32.0599 34.4835 32.5374 34.4365 32.9714 34.2567C33.4054 34.077 33.7763 33.7725 34.0372 33.382C34.2982 32.9914 34.4375 32.5322 34.4375 32.0625C34.4356 31.4332 34.1848 30.8302 33.7398 30.3852C33.2948 29.9402 32.6918 29.6894 32.0625 29.6875Z" fill="#69488F"/><path d="M35.625 19.0001C35.6125 14.5948 33.8569 10.3734 30.7418 7.25832C27.6267 4.14324 23.4054 2.38766 19 2.37512C16.1634 2.33448 13.37 3.07388 10.925 4.51262L12.2312 6.53137C13.1591 6.08434 14.1105 5.68792 15.0813 5.34387C13.1169 9.21692 12.0227 13.4724 11.875 17.8126H4.75C4.8831 15.8519 5.451 13.9454 6.4125 12.2314L4.63125 10.6876C3.15356 13.2086 2.37473 16.078 2.375 19.0001C2.375 23.4093 4.12656 27.638 7.24435 30.7558C10.3621 33.8736 14.5908 35.6251 19 35.6251C21.1168 35.644 23.2161 35.2403 25.175 34.4376L24.4625 32.1814C22.5156 33.014 20.401 33.38 18.2875 33.2501C15.7551 29.3552 14.357 24.8322 14.25 20.1876H35.5062C35.6044 19.7999 35.6445 19.3997 35.625 19.0001ZM15.2 32.7751C12.8382 32.0682 10.6801 30.8059 8.90625 29.0939C6.54968 26.6832 5.08388 23.5422 4.75 20.1876H11.875C12.0383 24.5778 13.174 28.877 15.2 32.7751ZM14.25 17.8126C14.3447 13.1832 15.6995 8.66717 18.1687 4.75012H19.8313C22.3005 8.66717 23.6553 13.1832 23.75 17.8126H14.25ZM26.125 17.8126C26.0336 13.412 24.8938 9.09676 22.8 5.22512C25.5942 6.03016 28.0781 7.66471 29.9229 9.91243C31.7677 12.1601 32.8865 14.9151 33.1313 17.8126H26.125Z" fill="#69488F"/></svg>',
            title: "Create for Real Life",
            subheading: "Function-led, designed to last",
            description:
              "Whether content, digital projects, or lifestyle essentials, our work is made to be used, revisited, and lived with, supporting balance, adaptability, and longevity.",
          },
        ],
        headingColor: "#000",
        descriptionColor: "#212121",
        stepTitleColor: "#000",
        stepSubheadingColor: "#212121",
        stepDescriptionColor: "#212121",
        iconContainerBackground: "#F5EDFF",
        iconContainerBorderColor: "#DFC6FF",
        iconColor: "#69488F",
        arrowColor: "#69488F",
      },
    },
    {
      sectionId: "studio-cards",
      enabled: true,
      order: 6,
      data: {
        cards: [
          {
            type: "image-overlay",
            title: "Explore our Studios at your own pace",
            backgroundColor: "#391A5C",
            backgroundImage:
              "https://res.cloudinary.com/dnh7x7r5j/image/upload/v1770743155/cardbackground_qwkoom.jpg",
            imagePosition: "15% center",
            overlayOpacity: 0.7,
            titleColor: "#FFF",
            titleFontSize: "clamp(18px, 3vw, 22px)",
            titleFontFamily: "var(--font-bona-nova)",
            buttons: [
              {
                text: "Publishing Studio",
                link: "#",
                backgroundColor: "#FFF",
                textColor: "#1C1917",
                fontFamily: "Arial, sans-serif",
                fontSize: "clamp(12px, 2vw, 14px)",
                isHighlighted: false,
              },
              {
                text: "Digital Studio",
                link: "#",
                backgroundColor: "#FFF",
                textColor: "#1C1917",
                fontFamily: "Arial, sans-serif",
                fontSize: "clamp(12px, 2vw, 14px)",
                isHighlighted: false,
              },
              {
                text: "FlexiBrez Studio",
                link: "#",
                backgroundColor: "#FFF",
                textColor: "#1C1917",
                fontFamily: "Arial, sans-serif",
                fontSize: "clamp(12px, 2vw, 14px)",
                isHighlighted: true,
              },
            ],
            minHeight: "180px",
            padding: "clamp(24px, 4vw, 45px) clamp(20px, 3vw, 36px)",
            alignment: "center",
          },
          {
            type: "gradient",
            title: "Connect with the Utter Lore community",
            backgroundColor: "#391A5C",
            gradientStart: "#EEDEFF",
            gradientEnd: "#F5F5F4",
            gradientAngle: 135,
            titleColor: "#1C1917",
            titleFontSize: "clamp(18px, 3vw, 24px)",
            titleFontFamily: "var(--font-bona-nova)",
            buttons: [
              {
                text: "Join the Community Hub",
                link: "#",
                backgroundColor: "#1C1917",
                textColor: "#FFF",
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(12px, 2vw, 14px)",
                isHighlighted: false,
              },
            ],
            minHeight: "180px",
            padding: "clamp(24px, 3vw, 30px) clamp(20px, 3vw, 32px)",
            alignment: "center",
          },
        ],
      },
    },
  ],
};

// ============================================
// SEED DATA - Header Configuration
// ============================================

// const headerConfigData: SeedPageData = {
//   schemaId: "header-config",
//   slug: "/config/header",
//   title: "Header Configuration",
//   description: "Site header/navbar configuration",
//   modifiedBy: "admin",
//   sections: [
//     {
//       sectionId: "header",
//       enabled: true,
//       order: 0,
//       data: {
//         logo: {
//           image: "/assets/images/logo.png",
//           alt: "UtterLore Logo",
//           link: "/",
//         },
//         headerStyle: {
//           position: "absolute",
//           top: "23px",
//           height: "103px",
//           backgroundColor: "transparent",
//           paddingHorizontal: "50px",
//         },
//         menuItems: [
//           {
//             label: "Home",
//             href: "/",
//             isSpecial: false,
//           },
//           {
//             label: "About",
//             href: "/about",
//             isSpecial: false,
//           },
//           {
//             label: "FlexiWare",
//             href: "/flexiware",
//             isSpecial: true,
//           },
//           {
//             label: "Contact",
//             href: "/contact",
//             isSpecial: false,
//           },
//         ],
//         menuStyle: {
//           fontSize: "clamp(14px, 1.25vw, 20px)",
//           normalFontWeight: "400",
//           activeFontWeight: "700",
//           textColor: "#FFFFFF",
//           activeUnderlineColor: "#FFFFFF",
//           gap: "clamp(16px, 2vw, 32px)",
//         },
//         ctaButton: {
//           enabled: true,
//           text: "Get in touch",
//           link: "/contact",
//           variant: "primary",
//           showArrow: true,
//           height: 52,
//           width: 195,
//         },
//         cartIcon: {
//           enabled: false,
//           iconColor: "#FFFFFF",
//         },
//       },
//     },
//   ],
// };

// ============================================
// SEED FUNCTION
// ============================================

async function seedPage(pageData: SeedPageData) {
  const { sections, ...pageInfo } = pageData;

  // Check if page already exists
  const existingPage = await prisma.page.findUnique({
    where: { slug: pageInfo.slug },
  });

  if (existingPage) {
    console.log(`Page "${pageInfo.slug}" already exists. Updating...`);

    // Delete existing sections
    await prisma.section.deleteMany({
      where: { pageId: existingPage.id },
    });

    // Update page and create new sections
    await prisma.page.update({
      where: { id: existingPage.id },
      data: {
        ...pageInfo,
        sections: {
          create: sections.map((section) => ({
            sectionId: section.sectionId,
            enabled: section.enabled,
            order: section.order,
            data: section.data as InputJsonValue,
          })),
        },
      },
    });

    console.log(`✅ Updated page: ${pageInfo.slug}`);
  } else {
    // Create new page with sections
    await prisma.page.create({
      data: {
        ...pageInfo,
        sections: {
          create: sections.map((section) => ({
            sectionId: section.sectionId,
            enabled: section.enabled,
            order: section.order,
            data: section.data as InputJsonValue,
          })),
        },
      },
    });

    console.log(`✅ Created page: ${pageInfo.slug}`);
  }
}

async function main() {
  console.log("🌱 Starting database seed...\n");

  try {
    // Seed Landing Page
    // await seedPage(landingPageData);

    // Seed About Page
    await seedPage(aboutPageData);

    // Seed Header Configuration
    // await seedPage(headerConfigData);

    console.log("\n✨ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
