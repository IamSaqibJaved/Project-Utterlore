import { Hero, Navbar, PhilosophySection, WhatWeDoSection, StudioValuesSection, MonAdamsSection, HowWeWorkSection, StudioCardsSection } from "@/components";
import { cmsApi } from "@/lib/api";

// Force dynamic rendering to always fetch fresh data from CMS
export const dynamic = "force-dynamic";

// Hero section data type
interface HeroData {
  sectionTitle?: string;
  title?: string;
  description?: string;
  descriptionMaxWidth?: number;
  backgroundImages?: string[];
  overlayColor?: string;
}

// Philosophy section data type
interface PhilosophyData {
  sectionTitle?: string;
  heading?: string;
  description?: string;
  items?: Array<{
    title: string;
    description: string;
  }>;
}

// What We Do section data type
interface WhatWeDoData {
  heading?: string;
  description?: string;
  items?: Array<{
    title: string;
    description: string;
    iconSvg?: string;
    isSpecial?: boolean;
  }>;
  cardBackground?: string;
  cardTitleColor?: string;
  cardDescriptionColor?: string;
  iconBackgroundColor?: string;
}

// Studio Values section data type
interface StudioValuesData {
  heading?: string;
  description?: string;
  values?: Array<{
    title: string;
    description?: string;
    iconSvg?: string;
  }>;
  iconBackground?: string;
  valueTitleColor?: string;
}

// Mon Adams section data type
interface MonAdamsData {
  name?: string;
  title?: string;
  bio?: string;
  image?: string;
  backgroundImage?: string;
  quote?: string;
  cards?: Array<{
    icon?: string;
    text: string;
    gradient?: string;
  }>;
  headingColor?: string;
  bioColor?: string;
  cardTextColor?: string;
  cardBackgroundColor?: string;
  cardBorderColor?: string;
  quoteColor?: string;
}

// How We Work section data type
interface HowWeWorkData {
  heading?: string;
  description?: string;
  steps?: Array<{
    iconSvg?: string;
    title: string;
    subheading?: string;
    description?: string;
  }>;
  headingColor?: string;
  descriptionColor?: string;
  stepTitleColor?: string;
  stepSubheadingColor?: string;
  stepDescriptionColor?: string;
  iconContainerBackground?: string;
  iconContainerBorderColor?: string;
  iconColor?: string;
  arrowColor?: string;
}

// Studio Cards section data type
interface StudioCardsData {
  cards?: Array<{
    type: "image-overlay" | "gradient";
    title: string;
    description?: string;
    backgroundColor: string;
    backgroundImage?: string;
    imagePosition?: string;
    overlayOpacity?: number;
    gradientStart?: string;
    gradientEnd?: string;
    gradientAngle?: number;
    titleColor: string;
    titleFontSize: string;
    titleFontFamily: string;
    buttons: Array<{
      text: string;
      link: string;
      backgroundColor: string;
      textColor: string;
      fontFamily: string;
      fontSize: string;
      isHighlighted?: boolean;
    }>;
    minHeight: string;
    padding: string;
    alignment?: string;
  }>;
}

// About page data type
interface AboutPageData {
  hero: {
    data: HeroData | undefined;
    enabled: boolean;
  };
  philosophy: {
    data: PhilosophyData | undefined;
    enabled: boolean;
  };
  whatWeDo: {
    data: WhatWeDoData | undefined;
    enabled: boolean;
  };
  studioValues: {
    data: StudioValuesData | undefined;
    enabled: boolean;
  };
  monAdams: {
    data: MonAdamsData | undefined;
    enabled: boolean;
  };
  howWeWork: {
    data: HowWeWorkData | undefined;
    enabled: boolean;
  };
  studioCards: {
    data: StudioCardsData | undefined;
    enabled: boolean;
  };
}


// Fetch header configuration from CMS
async function getHeaderConfig() {
  try {
    const page = await cmsApi.pages.getBySlug("/config/header");
    
    if (page && page.sections && page.sections.length > 0) {
      const headerSection = page.sections[0];
      return headerSection.data;
    }
    
    return null;
  } catch (error) {
    console.error("Failed to fetch header config:", error);
    return null;
  }
}

// Fetch about page data from CMS
async function getAboutPageData(): Promise<AboutPageData> {
  try {
    const page = await cmsApi.pages.getBySlug("/about");

    if (page && page.sections) {
      // Find the hero section
      const heroSection = page.sections.find(
        (section) => section.id === "hero" || section.sectionId === "hero",
      );

      // Find the philosophy section
      const philosophySection = page.sections.find(
        (section) =>
          section.id === "philosophy" || section.sectionId === "philosophy",
      );

      // Find the what-we-do section
      const whatWeDoSection = page.sections.find(
        (section) =>
          section.id === "what-we-do" || section.sectionId === "what-we-do",
      );

      // Find the studio-values section
      const studioValuesSection = page.sections.find(
        (section) =>
          section.id === "studio-values" || section.sectionId === "studio-values",
      );

      // Find the mon-adams section
      const monAdamsSection = page.sections.find(
        (section) =>
          section.id === "mon-adams" || section.sectionId === "mon-adams",
      );

      // Find the how-we-work section
      const howWeWorkSection = page.sections.find(
        (section) =>
          section.id === "how-we-work" || section.sectionId === "how-we-work",
      );

      // Find the studio-cards section
      const studioCardsSection = page.sections.find(
        (section) =>
          section.id === "studio-cards" || section.sectionId === "studio-cards",
      );

      return {
        hero: {
          data: heroSection ? (heroSection.data as HeroData) : undefined,
          enabled: heroSection?.enabled !== false,
        },
        philosophy: {
          data: philosophySection
            ? (philosophySection.data as PhilosophyData)
            : undefined,
          enabled: philosophySection?.enabled !== false,
        },
        whatWeDo: {
          data: whatWeDoSection
            ? (whatWeDoSection.data as WhatWeDoData)
            : undefined,
          enabled: whatWeDoSection?.enabled !== false,
        },
        studioValues: {
          data: studioValuesSection
            ? (studioValuesSection.data as StudioValuesData)
            : undefined,
          enabled: studioValuesSection?.enabled !== false,
        },
        monAdams: {
          data: monAdamsSection
            ? (monAdamsSection.data as MonAdamsData)
            : undefined,
          enabled: monAdamsSection?.enabled !== false,
        },
        howWeWork: {
          data: howWeWorkSection
            ? (howWeWorkSection.data as HowWeWorkData)
            : undefined,
          enabled: howWeWorkSection?.enabled !== false,
        },
        studioCards: {
          data: studioCardsSection
            ? (studioCardsSection.data as StudioCardsData)
            : undefined,
          enabled: studioCardsSection?.enabled !== false,
        },
      };
    }

    return {
      hero: {
        data: undefined,
        enabled: false,
      },
      philosophy: {
        data: undefined,
        enabled: false,
      },
      whatWeDo: {
        data: undefined,
        enabled: false,
      },
      studioValues: {
        data: undefined,
        enabled: false,
      },
      monAdams: {
        data: undefined,
        enabled: false,
      },
      howWeWork: {
        data: undefined,
        enabled: false,
      },
      studioCards: {
        data: undefined,
        enabled: false,
      },
    };
  } catch (error) {
    console.error("Failed to fetch about page data:", error);
    return {
      hero: {
        data: undefined,
        enabled: false,
      },
      philosophy: {
        data: undefined,
        enabled: false,
      },
      whatWeDo: {
        data: undefined,
        enabled: false,
      },
      studioValues: {
        data: undefined,
        enabled: false,
      },
      monAdams: {
        data: undefined,
        enabled: false,
      },
      howWeWork: {
        data: undefined,
        enabled: false,
      },
      studioCards: {
        data: undefined,
        enabled: false,
      },
    };
  }
}

export default async function AboutPage() {
  const sections = await getAboutPageData();
  const headerConfig = await getHeaderConfig();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {headerConfig && (
        <Navbar
          {...headerConfig}
          activeItem="/about"
          hasHeroSection={sections.hero.enabled}
        />
      )}
      
      {/* Hero Section - CMS Driven */}
      {sections.hero.enabled && sections.hero.data && (
        <Hero
          sectionTitle={sections.hero.data.sectionTitle}
          title={sections.hero.data.title}
          description={sections.hero.data.description}
          descriptionMaxWidth={sections.hero.data.descriptionMaxWidth}
          carouselImages={sections.hero.data.backgroundImages}
          overlayColor={sections.hero.data.overlayColor}
        />
      )}
      
      {/* Philosophy Section - CMS Driven */}
      {sections.philosophy.enabled && sections.philosophy.data && (
        <PhilosophySection
          sectionTitle={sections.philosophy.data.sectionTitle}
          heading={sections.philosophy.data.heading}
          description={sections.philosophy.data.description}
          items={sections.philosophy.data.items}
        />
      )}
      
      {/* What We Do Section - CMS Driven */}
      {sections.whatWeDo.enabled && sections.whatWeDo.data && (
        <WhatWeDoSection
          heading={sections.whatWeDo.data.heading}
          description={sections.whatWeDo.data.description}
          items={sections.whatWeDo.data.items}
          cardBackground={sections.whatWeDo.data.cardBackground}
          cardTitleColor={sections.whatWeDo.data.cardTitleColor}
          cardDescriptionColor={sections.whatWeDo.data.cardDescriptionColor}
          iconBackgroundColor={sections.whatWeDo.data.iconBackgroundColor}
        />
      )}
      
      {/* Studio Values Section - CMS Driven */}
      {sections.studioValues.enabled && sections.studioValues.data && (
        <StudioValuesSection
          heading={sections.studioValues.data.heading}
          description={sections.studioValues.data.description}
          values={sections.studioValues.data.values}
          iconBackground={sections.studioValues.data.iconBackground}
          valueTitleColor={sections.studioValues.data.valueTitleColor}
        />
      )}
      
      {/* Mon Adams Section - CMS Driven */}
      {sections.monAdams.enabled && sections.monAdams.data && (
        <MonAdamsSection
          name={sections.monAdams.data.name}
          title={sections.monAdams.data.title}
          bio={sections.monAdams.data.bio}
          image={sections.monAdams.data.image}
          backgroundImage={sections.monAdams.data.backgroundImage}
          quote={sections.monAdams.data.quote}
          cards={sections.monAdams.data.cards}
          headingColor={sections.monAdams.data.headingColor}
          bioColor={sections.monAdams.data.bioColor}
          cardTextColor={sections.monAdams.data.cardTextColor}
          cardBackgroundColor={sections.monAdams.data.cardBackgroundColor}
          cardBorderColor={sections.monAdams.data.cardBorderColor}
          quoteColor={sections.monAdams.data.quoteColor}
        />
      )}
      
      {/* How We Work Section - CMS Driven */}
      {sections.howWeWork.enabled && sections.howWeWork.data && (
        <HowWeWorkSection
          heading={sections.howWeWork.data.heading}
          description={sections.howWeWork.data.description}
          steps={sections.howWeWork.data.steps}
          headingColor={sections.howWeWork.data.headingColor}
          descriptionColor={sections.howWeWork.data.descriptionColor}
          stepTitleColor={sections.howWeWork.data.stepTitleColor}
          stepSubheadingColor={sections.howWeWork.data.stepSubheadingColor}
          stepDescriptionColor={sections.howWeWork.data.stepDescriptionColor}
          iconContainerBackground={sections.howWeWork.data.iconContainerBackground}
          iconContainerBorderColor={sections.howWeWork.data.iconContainerBorderColor}
          iconColor={sections.howWeWork.data.iconColor}
          arrowColor={sections.howWeWork.data.arrowColor}
        />
      )}
      
      {/* Studio Cards Section - CMS Driven */}
      {sections.studioCards.enabled && sections.studioCards.data && sections.studioCards.data.cards && (
        <StudioCardsSection data={sections.studioCards.data} />
      )}
    </div>
  );
}

