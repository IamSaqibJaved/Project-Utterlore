import { Bona_Nova, Inter, Caveat, Dancing_Script } from "next/font/google";

// Bona Nova for headings
export const bonaNova = Bona_Nova({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-bona-nova",
  display: "swap",
});

// Inter for content
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Figma Hand - Using Caveat as a handwritten-style alternative
// If you have Figma Hand font files, place them in public/fonts/ and use localFont instead
// For now, using Caveat which is a similar handwritten style font from Google Fonts
export const figmaHand = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-figma-hand",
  display: "swap",
});

// Brunella - Custom font for special menu items (Flexi Brez)
// Using Dancing Script as a similar handwritten/script style alternative
// If you have Brunella font files, place them in public/fonts/ and use localFont instead
export const brunella = Dancing_Script({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-brunella",
  display: "swap",
});

// Font utility classes
export const fontClasses = {
  heading: bonaNova.variable,
  content: inter.variable,
  sectionHeading: figmaHand.variable,
  brunella: brunella.variable,
};

// Typography presets with customizable properties
export const typography = {
  // Heading styles (Bona Nova)
  heading: {
    h1: {
      className: `${bonaNova.variable} font-bona-nova text-5xl md:text-6xl lg:text-7xl font-bold`,
      defaultStyles: {
        fontWeight: 700,
        fontSize: "3rem",
        lineHeight: "1.2",
        letterSpacing: "-0.02em",
      },
    },
    h2: {
      className: `${bonaNova.variable} font-bona-nova text-4xl md:text-5xl lg:text-6xl font-bold`,
      defaultStyles: {
        fontWeight: 700,
        fontSize: "2.5rem",
        lineHeight: "1.2",
        letterSpacing: "-0.02em",
      },
    },
    h3: {
      className: `${bonaNova.variable} font-bona-nova text-3xl md:text-4xl lg:text-5xl font-bold`,
      defaultStyles: {
        fontWeight: 700,
        fontSize: "2rem",
        lineHeight: "1.3",
      },
    },
  },
  // Content styles (Inter)
  content: {
    body: {
      className: `${inter.variable} font-inter text-base`,
      defaultStyles: {
        fontWeight: 400,
        fontSize: "1rem",
        lineHeight: "1.75",
      },
    },
    bodyLarge: {
      className: `${inter.variable} font-inter text-lg`,
      defaultStyles: {
        fontWeight: 400,
        fontSize: "1.125rem",
        lineHeight: "1.75",
      },
    },
    bodySmall: {
      className: `${inter.variable} font-inter text-sm`,
      defaultStyles: {
        fontWeight: 400,
        fontSize: "0.875rem",
        lineHeight: "1.5",
      },
    },
  },
  // Section heading styles (Figma Hand) - customizable
  sectionHeading: {
    default: {
      className: `${figmaHand.variable} font-figma-hand text-sm md:text-base uppercase tracking-wider`,
      defaultStyles: {
        fontWeight: 400,
        fontSize: "0.875rem",
        lineHeight: "1.5",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      },
    },
    large: {
      className: `${figmaHand.variable} font-figma-hand text-base md:text-lg uppercase tracking-wider`,
      defaultStyles: {
        fontWeight: 500,
        fontSize: "1rem",
        lineHeight: "1.5",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      },
    },
    small: {
      className: `${figmaHand.variable} font-figma-hand text-xs md:text-sm uppercase tracking-wider`,
      defaultStyles: {
        fontWeight: 400,
        fontSize: "0.75rem",
        lineHeight: "1.4",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      },
    },
  },
};

// Helper function to create custom typography styles
export function createTypographyStyle(
  fontFamily: "heading" | "content" | "sectionHeading",
  options?: {
    weight?: number;
    size?: string;
    lineHeight?: string | number;
    letterSpacing?: string;
  }
) {
  const baseFont = fontClasses[fontFamily];
  const styles: Record<string, string> = {
    fontFamily: `var(${baseFont})`,
  };

  if (options?.weight) styles.fontWeight = options.weight.toString();
  if (options?.size) styles.fontSize = options.size;
  if (options?.lineHeight)
    styles.lineHeight =
      typeof options.lineHeight === "number"
        ? options.lineHeight.toString()
        : options.lineHeight;
  if (options?.letterSpacing) styles.letterSpacing = options.letterSpacing;

  return styles;
}

