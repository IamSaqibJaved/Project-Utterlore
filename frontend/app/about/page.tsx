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

// Default hero data as fallback
const defaultHeroData: HeroData = {
  sectionTitle: "UTTER LORE",
  title: "Where Insight, Design and Intention Shape Modern Living",
  description:
    "Utter Lore is a considered space for modern living, shaped by knowledge, design, and intention. We create thoughtful content, considered digital and e-commerce experiences, and flexible lifestyle essentials. Each element is designed to support clarity, balance, and mindful living.",
  descriptionMaxWidth: 885,
  backgroundImages: ["/assets/images/CarasoulWallpaper.jpg"],
  overlayColor: "rgba(0, 0, 0, 0.5)",
};

// Default philosophy data as fallback
const defaultPhilosophyData: PhilosophyData = {
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
};

// Default What We Do data as fallback
const defaultWhatWeDoData: WhatWeDoData = {
  heading: "What We Do",
  description:
    "Utter Lore brings together knowledge, design, and intention to support thoughtful modern living.\nThrough Publishing, Digital, and FlexiBrez, we create content, experiences, and everyday essentials designed for clarity, balance, and long-term value.",
  items: [
    {
      title: "Publishing Studio",
      description:
        "Thoughtful editorial content and resources designed to inform, inspire, and remain relevant over time.",
      isSpecial: false,
    },
    {
      title: "Digital Studio",
      description:
        "End-to-end project design and content creation, delivering intentional digital experiences with clarity and purpose.",
      isSpecial: false,
    },
    {
      title: "FlexiBrez Studio",
      description:
        "Flexible lifestyle essentials created to adapt to everyday life and support ease, balance, and mindful use.",
      isSpecial: true,
    },
  ],
};

// Default Studio Values data as fallback
const defaultStudioValuesData: StudioValuesData = {
  heading: "The Studio Values",
  description:
    "We bring research, thoughtful writing, and creative perspective together to define Utter Lore's editorial voice.",
  values: [
    {
      title: "Clarity",
    },
    {
      title: "Design",
    },
    {
      title: "Intentional",
    },
    {
      title: "Purposeful",
    },
  ],
};

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
async function getAboutPageData() {
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

      return {
        hero: {
          data: heroSection ? (heroSection.data as HeroData) : defaultHeroData,
          enabled: heroSection?.enabled !== false,
        },
        philosophy: {
          data: philosophySection
            ? (philosophySection.data as PhilosophyData)
            : defaultPhilosophyData,
          enabled: philosophySection?.enabled !== false,
        },
        whatWeDo: {
          data: whatWeDoSection
            ? (whatWeDoSection.data as WhatWeDoData)
            : defaultWhatWeDoData,
          enabled: whatWeDoSection?.enabled !== false,
        },
        studioValues: {
          data: studioValuesSection
            ? (studioValuesSection.data as StudioValuesData)
            : defaultStudioValuesData,
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
      };
    }

    return {
      hero: {
        data: defaultHeroData,
        enabled: true,
      },
      philosophy: {
        data: defaultPhilosophyData,
        enabled: true,
      },
      whatWeDo: {
        data: defaultWhatWeDoData,
        enabled: true,
      },
      studioValues: {
        data: defaultStudioValuesData,
        enabled: true,
      },
      monAdams: {
        data: undefined,
        enabled: true,
      },
      howWeWork: {
        data: undefined,
        enabled: true,
      },
    };
  } catch (error) {
    console.error("Failed to fetch about page data:", error);
    return {
      hero: {
        data: defaultHeroData,
        enabled: true,
      },
      philosophy: {
        data: defaultPhilosophyData,
        enabled: true,
      },
      whatWeDo: {
        data: defaultWhatWeDoData,
        enabled: true,
      },
      studioValues: {
        data: defaultStudioValuesData,
        enabled: true,
      },
      monAdams: {
        data: undefined,
        enabled: true,
      },
      howWeWork: {
        data: undefined,
        enabled: true,
      },
    };
  }
}

export default async function AboutPage() {
  const sections = await getAboutPageData();
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
        activeItem="/about"
      />
      
      {/* Hero Section - CMS Driven */}
      {sections.hero.enabled && (
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
      {sections.philosophy.enabled && (
        <PhilosophySection
          sectionTitle={sections.philosophy.data.sectionTitle}
          heading={sections.philosophy.data.heading}
          description={sections.philosophy.data.description}
          items={sections.philosophy.data.items}
        />
      )}
      
      {/* What We Do Section - CMS Driven */}
      {sections.whatWeDo.enabled && (
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
      {sections.studioValues.enabled && (
        <StudioValuesSection
          heading={sections.studioValues.data.heading}
          description={sections.studioValues.data.description}
          values={sections.studioValues.data.values}
          iconBackground={sections.studioValues.data.iconBackground}
          valueTitleColor={sections.studioValues.data.valueTitleColor}
        />
      )}
      
      {/* Mon Adams Section - CMS Driven */}
      {sections.monAdams.enabled && (
        <MonAdamsSection
          name={sections.monAdams.data?.name}
          title={sections.monAdams.data?.title}
          bio={sections.monAdams.data?.bio}
          image={sections.monAdams.data?.image}
          backgroundImage={sections.monAdams.data?.backgroundImage}
          quote={sections.monAdams.data?.quote}
          cards={sections.monAdams.data?.cards}
          headingColor={sections.monAdams.data?.headingColor}
          bioColor={sections.monAdams.data?.bioColor}
          cardTextColor={sections.monAdams.data?.cardTextColor}
          cardBackgroundColor={sections.monAdams.data?.cardBackgroundColor}
          cardBorderColor={sections.monAdams.data?.cardBorderColor}
          quoteColor={sections.monAdams.data?.quoteColor}
        />
      )}
      
      {/* How We Work Section - CMS Driven */}
      {sections.howWeWork.enabled && (
        <HowWeWorkSection
          heading={sections.howWeWork.data?.heading}
          description={sections.howWeWork.data?.description}
          steps={sections.howWeWork.data?.steps}
          headingColor={sections.howWeWork.data?.headingColor}
          descriptionColor={sections.howWeWork.data?.descriptionColor}
          stepTitleColor={sections.howWeWork.data?.stepTitleColor}
          stepSubheadingColor={sections.howWeWork.data?.stepSubheadingColor}
          stepDescriptionColor={sections.howWeWork.data?.stepDescriptionColor}
          iconContainerBackground={sections.howWeWork.data?.iconContainerBackground}
          iconContainerBorderColor={sections.howWeWork.data?.iconContainerBorderColor}
          iconColor={sections.howWeWork.data?.iconColor}
          arrowColor={sections.howWeWork.data?.arrowColor}
        />
      )}
      
      <StudioCardsSection />
    </div>
  );
}

