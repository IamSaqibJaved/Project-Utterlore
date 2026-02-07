import { Hero, Navbar, PhilosophySection, WhatWeDoSection, StudioValuesSection, MonAdamsSection, HowWeWorkSection, StudioCardsSection } from "@/components";
import { cmsApi } from "@/lib/api";

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

export default async function AboutPage() {
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
      <Hero
        sectionTitle="UTTER LORE"
        title="Where Insight, Design and Intention Shape Modern Living"
        description="Utter Lore is a considered space for modern living, shaped by knowledge, design, and intention. We create thoughtful content, considered digital and e-commerce experiences, and flexible lifestyle essentials. Each element is designed to support clarity, balance, and mindful living."
        descriptionMaxWidth={885}
        // No buttons for About Us page - simply don't pass primaryButtonText/primaryButtonLink
      />
      <PhilosophySection />
      <WhatWeDoSection />
      <StudioValuesSection />
      <MonAdamsSection />
      <HowWeWorkSection />
      <StudioCardsSection />
    </div>
  );
}

