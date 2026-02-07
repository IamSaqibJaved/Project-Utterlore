import { Hero, Navbar, PhilosophySection, WhatWeDoSection, StudioValuesSection, MonAdamsSection, HowWeWorkSection, StudioCardsSection } from "@/components";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Navbar
        logo="/assets/images/logo.png"
        logoAlt="UtterLore Logo"
        menuItems={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Publishing", href: "/publishing" },
          { label: "Digital", href: "/digital" },
          { label: "Flexi Brez", href: "/flexi-brez", isSpecial: true },
          { label: "Blog", href: "/blog" },
          { label: "Community", href: "/community" },
          { label: "Login", href: "/login" },
        ]}
        activeItem="/about"
        ctaText="Get in touch"
        ctaLink="/contact"
        showCart={true}
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

