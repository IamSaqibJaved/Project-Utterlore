import { Hero, Navbar, AboutUs } from "@/components";
import { cmsApi } from "@/lib/api";

// Force dynamic rendering to always fetch fresh data from CMS
export const dynamic = "force-dynamic";
// Or use revalidate for ISR (Incremental Static Regeneration)
// export const revalidate = 10; // Revalidate every 10 seconds

// Hero section data type
interface HeroData {
  sectionTitle?: string;
  title?: string;
  description?: string;
  primaryButton?: {
    text?: string;
    link?: string;
    backgroundColor?: string;
    textColor?: string;
    enabled?: boolean;
  };
  secondaryButton?: {
    text?: string;
    link?: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    enabled?: boolean;
  };
  backgroundImages?: string[];
  overlayColor?: string;
}

// About Us section data type
interface AboutUsData {
  sectionTitle?: string;
  heading?: string;
  content?: string[];
  buttonText?: string;
  buttonLink?: string;
  image?: string;
  imagePosition?: string;
}

// Default hero data as fallback
const defaultHeroData: HeroData = {
  sectionTitle: "UTTER LORE",
  title: "EMPOWERING KNOWLEDGE FOR THE MINDFUL COLLECTIVES",
  description:
    "Where design meets storytelling. Explore insights, ideas, and reflections across beauty, fashion, and lifestyle.",
  primaryButton: {
    text: "Explore Our Stories",
    link: "/stories",
    enabled: true,
  },
};

// Default about data as fallback
const defaultAboutData: AboutUsData = {
  sectionTitle: "About",
  heading: "UTTER LORE",
  content: [
    "Utter Lore stands as a visionary entity, seamlessly blending creativity with purpose to craft experiences that transcend the ordinary.",
    "From curated fashion insights and thoughtful lifestyle narratives to transformative beauty explorations, Utter Lore redefines the way we engage with the world around us.",
    "At its core, Utter Lore is not just a brand—it is a movement.",
  ],
  buttonText: "Read Our Story",
  buttonLink: "/about",
  image: "/assets/images/AboutUs.png",
  imagePosition: "left",
};

// Fetch header configuration from CMS
async function getHeaderConfig() {
  try {
    const page = await cmsApi.pages.getBySlug("/config/header");
    
    if (page && page.sections && page.sections.length > 0) {
      const headerSection = page.sections[0];
      return headerSection.data;
    }
    
    // Return default config if not found
    return null;
  } catch (error) {
    console.error("Failed to fetch header config:", error);
    return null;
  }
}

// Fetch landing page data from CMS
async function getLandingPageData() {
  try {
    // Try to fetch from API using slug
    const page = await cmsApi.pages.getBySlug("/");

    if (page && page.sections) {
      // Find the hero section
      const heroSection = page.sections.find(
        (section) => section.id === "hero" || section.sectionId === "hero",
      );

      // Find the about section
      const aboutSection = page.sections.find(
        (section) =>
          section.id === "about-preview" ||
          section.sectionId === "about-preview",
      );

      return {
        hero: {
          data: heroSection ? (heroSection.data as HeroData) : defaultHeroData,
          enabled: heroSection?.enabled !== false,
        },
        about: {
          data: aboutSection
            ? (aboutSection.data as AboutUsData)
            : defaultAboutData,
          enabled: aboutSection?.enabled !== false,
        },
      };
    }

    return {
      hero: {
        data: defaultHeroData,
        enabled: true,
      },
      about: {
        data: defaultAboutData,
        enabled: true,
      },
    };
  } catch (error) {
    console.error("Failed to fetch landing page data:", error);
    return {
      hero: {
        data: defaultHeroData,
        enabled: true,
      },
      about: {
        data: defaultAboutData,
        enabled: true,
      },
    };
  }
}

export default async function Home() {
  const sections = await getLandingPageData();
  const headerConfig = await getHeaderConfig();

  // Extract header configuration with defaults
  const navbarProps = headerConfig || {
    logo: { image: "/assets/images/logo.png", alt: "UtterLore Logo", link: "/" },
    menuItems: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Publishing", href: "/publishing" },
      { label: "Digital", href: "/digital" },
      { label: "Flexi Brez", href: "/flexi-brez", isSpecial: true },
      { label: "Blog", href: "/blog" },
      { label: "Community", href: "/community" },
      { label: "Login", href: "/login" },
    ],
    ctaButton: {
      enabled: true,
      text: "Get in touch",
      link: "/contact",
    },
    cartIcon: {
      enabled: true,
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Navbar
        {...navbarProps}
        activeItem="/"
      />
      {sections.hero.enabled && (
        <Hero
          sectionTitle={sections.hero.data.sectionTitle}
          title={sections.hero.data.title}
          description={sections.hero.data.description}
          primaryButtonText={
            sections.hero.data.primaryButton?.enabled
              ? sections.hero.data.primaryButton.text
              : undefined
          }
          primaryButtonLink={
            sections.hero.data.primaryButton?.enabled
              ? sections.hero.data.primaryButton.link
              : undefined
          }
          primaryButtonBgColor={
            sections.hero.data.primaryButton?.backgroundColor
          }
          primaryButtonTextColor={sections.hero.data.primaryButton?.textColor}
          secondaryButtonText={
            sections.hero.data.secondaryButton?.enabled
              ? sections.hero.data.secondaryButton.text
              : undefined
          }
          secondaryButtonLink={
            sections.hero.data.secondaryButton?.enabled
              ? sections.hero.data.secondaryButton.link
              : undefined
          }
          secondaryButtonBgColor={
            sections.hero.data.secondaryButton?.backgroundColor
          }
          secondaryButtonTextColor={
            sections.hero.data.secondaryButton?.textColor
          }
          secondaryButtonBorderColor={
            sections.hero.data.secondaryButton?.borderColor
          }
          carouselImages={sections.hero.data.backgroundImages}
          overlayColor={sections.hero.data.overlayColor}
        />
      )}
      {sections.about.enabled && (
        <AboutUs
          sectionTitle={sections.about.data.sectionTitle}
          heading={sections.about.data.heading}
          content={sections.about.data.content}
          buttonText={sections.about.data.buttonText}
          buttonLink={sections.about.data.buttonLink}
          imageSrc={sections.about.data.image}
          imagePosition={sections.about.data.imagePosition}
        />
      )}
    </div>
  );
}
