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

const landingPageData: SeedPageData = {
  schemaId: "landing-page",
  slug: "/",
  title: "UtterLore - Home",
  description: "Where design meets storytelling",
  modifiedBy: "admin",
  sections: [
    {
      sectionId: "hero",
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
        backgroundImages: [
          "https://res.cloudinary.com/dnh7x7r5j/image/upload/v1768154458/CarasoulWallpaper_ls56hr.jpg",
        ],
        overlayColor: "rgba(0, 0, 0, 0.5)",
      },
    },
    {
      sectionId: "about-preview",
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
        image:
          "https://res.cloudinary.com/dnh7x7r5j/image/upload/v1768154458/AboutUs_placeholder.jpg",
        imagePosition: "left",
      },
    },
  ],
};

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
        backgroundImages: [
          "https://res.cloudinary.com/dnh7x7r5j/image/upload/v1768154458/CarasoulWallpaper_ls56hr.jpg",
        ],
      },
    },
    {
      sectionId: "philosophy",
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
      sectionId: "what-we-do",
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
      sectionId: "studio-values",
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
      sectionId: "mon-adams",
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
      sectionId: "how-we-work",
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
      sectionId: "studio-cards",
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
};

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
    await seedPage(landingPageData);

    // Seed About Page
    await seedPage(aboutPageData);

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
