import { PageContent, SectionContent } from "@/types/schema";

// ============================================
// MOCK DATA - Landing Page
// ============================================

export const landingPageContent: PageContent = {
  id: "landing-page-content",
  pageSchemaId: "landing-page",
  slug: "/",
  sections: [
    {
      id: "hero",
      enabled: true,
      order: 0,
      data: {
        sectionTitle: "UTTER LORE",
        title: "EMPOWERING KNOWLEDGE FOR THE MINDFUL COLLECTIVES",
        description:
          "Where design meets storytelling. Explore insights, ideas, and reflections across beauty, fashion, and lifestyle.",
        primaryButton: {
          text: "Explore Our Stories",
          link: "/stories",
          enabled: true,
        },
        secondaryButton: {
          text: "",
          link: "",
          enabled: false,
        },
        backgroundImages: ["/assets/images/CarasoulWallpaper.jpg"],
        overlayColor: "rgba(0, 0, 0, 0.5)",
      },
    },
    {
      id: "about-preview",
      enabled: true,
      order: 1,
      data: {
        sectionTitle: "About",
        heading: "UTTER LORE",
        content: [
          "Utter Lore stands as a visionary entity, seamlessly blending creativity with purpose to craft experiences that transcend the ordinary. Rooted in the philosophy of elevating everyday life through design, beauty, and storytelling, Utter Lore embodies an unwavering commitment to authenticity and innovation.",
          "From curated fashion insights and thoughtful lifestyle narratives to transformative beauty explorations, Utter Lore redefines the way we engage with the world around us. Each endeavor is meticulously designed to inspire, educate, and empower individuals to embrace their unique journeys with confidence and clarity.",
          "At its core, Utter Lore is not just a brand—it is a movement. A celebration of meaningful creativity that bridges the gap between aspiration and reality, offering a sanctuary for those seeking depth, elegance, and purpose in all they pursue.",
        ],
        buttonText: "Read Our Story",
        buttonLink: "/about",
        image: "/assets/images/AboutUs.png",
        imagePosition: "left",
      },
    },
  ],
  metadata: {
    title: "UtterLore - Home",
    description: "Where design meets storytelling",
    lastModified: new Date().toISOString(),
    modifiedBy: "admin",
  },
};

// ============================================
// MOCK DATA - About Page
// ============================================

export const aboutPageContent: PageContent = {
  id: "about-page-content",
  pageSchemaId: "about-page",
  slug: "/about",
  sections: [
    {
      id: "hero",
      enabled: true,
      order: 0,
      data: {
        sectionTitle: "UTTER LORE",
        title: "Where Insight, Design and Intention Shape Modern Living",
        description:
          "Utter Lore is a considered space for modern living, shaped by knowledge, design, and intention. We create thoughtful content, considered digital and e-commerce experiences, and flexible lifestyle essentials. Each element is designed to support clarity, balance, and mindful living.",
        descriptionMaxWidth: 885,
        backgroundImages: [],
      },
    },
    {
      id: "philosophy",
      enabled: true,
      order: 1,
      data: {
        title: "Our Philosophy",
        description:
          "We believe in the power of intention. Every project we undertake is guided by a commitment to quality, sustainability, and meaningful impact.",
        image: "",
        layout: "image-left",
      },
    },
    {
      id: "what-we-do",
      enabled: true,
      order: 2,
      data: {
        title: "What We Do",
        description:
          "We operate across multiple verticals, each designed to serve our community's evolving needs.",
        services: [
          {
            title: "Publishing",
            description: "Thoughtful content that inspires and educates.",
            icon: "BookOpen",
            image: "",
            link: "/publishing",
          },
          {
            title: "Digital",
            description:
              "Considered digital experiences and e-commerce solutions.",
            icon: "Monitor",
            image: "",
            link: "/digital",
          },
          {
            title: "Lifestyle",
            description: "Flexible essentials for modern living.",
            icon: "Heart",
            image: "",
            link: "/lifestyle",
          },
        ],
      },
    },
    {
      id: "studio-values",
      enabled: true,
      order: 3,
      data: {
        title: "Our Values",
        values: [
          {
            title: "Intention",
            description: "Every decision is purposeful and considered.",
            icon: "Target",
          },
          {
            title: "Quality",
            description: "We never compromise on craftsmanship.",
            icon: "Award",
          },
          {
            title: "Community",
            description: "We build for and with our community.",
            icon: "Users",
          },
        ],
      },
    },
    {
      id: "mon-adams",
      enabled: true,
      order: 4,
      data: {
        name: "Mon Adams",
        title: "Founder & Creative Director",
        bio: "With over a decade of experience in design and publishing, Mon founded Utter Lore to create a space where creativity and intention meet.",
        image: "",
        quote:
          "Design is not just what it looks like and feels like. Design is how it works.",
        layout: "image-right",
      },
    },
    {
      id: "how-we-work",
      enabled: true,
      order: 5,
      data: {
        title: "How We Work",
        description:
          "Our process is collaborative, iterative, and always focused on outcomes.",
        steps: [
          {
            number: "01",
            title: "Discovery",
            description:
              "We start by understanding your vision, goals, and challenges.",
          },
          {
            number: "02",
            title: "Strategy",
            description:
              "We develop a comprehensive plan aligned with your objectives.",
          },
          {
            number: "03",
            title: "Creation",
            description:
              "We bring ideas to life with careful attention to detail.",
          },
          {
            number: "04",
            title: "Launch",
            description: "We ensure smooth deployment and continued support.",
          },
        ],
      },
    },
    {
      id: "studio-cards",
      enabled: true,
      order: 6,
      data: {
        title: "Explore Our World",
        cards: [
          {
            title: "Our Blog",
            description: "Insights, ideas, and inspiration from our team.",
            image: "",
            link: "/blog",
            linkText: "Read More",
          },
          {
            title: "Join Us",
            description: "Explore career opportunities at Utter Lore.",
            image: "",
            link: "/careers",
            linkText: "View Openings",
          },
          {
            title: "Contact",
            description: "Let's start a conversation about your next project.",
            image: "",
            link: "/contact",
            linkText: "Get in Touch",
          },
        ],
        columns: "3",
      },
    },
  ],
  metadata: {
    title: "About Us - UtterLore",
    description: "Learn about our philosophy, values, and team",
    lastModified: new Date().toISOString(),
    modifiedBy: "admin",
  },
};

// ============================================
// ALL PAGE CONTENT
// ============================================

export const allPageContent: Record<string, PageContent> = {
  "landing-page": landingPageContent,
  "about-page": aboutPageContent,
};
