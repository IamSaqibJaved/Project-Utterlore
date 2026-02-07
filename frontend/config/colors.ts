// Color configuration for UtterLore

export const colors = {
  // Primary color
  primary: {
    DEFAULT: "#69488F",
    50: "#F5F2F8",
    100: "#E8E0F0",
    200: "#D4C4E0",
    300: "#B89CC8",
    400: "#9A75B0",
    500: "#69488F", // Main primary color
    600: "#5A3D7A",
    700: "#4A3265",
    800: "#3B2850",
    900: "#2B1E3B",
  },
  // Secondary color (White)
  secondary: {
    DEFAULT: "#FFFFFF",
    off: "#F9F9F9",
    light: "#FAFAFA",
  },
  // Overlay color
  overlay: {
    DEFAULT: "#180330B2", // rgba(24, 3, 48, 0.698)
    rgba: "rgba(24, 3, 48, 0.698)",
  },
  // Text colors
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.9)",
    muted: "rgba(255, 255, 255, 0.7)",
  },
  // Background colors
  background: {
    dark: "#180330",
    overlay: "rgba(24, 3, 48, 0.698)",
  },
};

// CSS variables for colors (to use in Tailwind)
export const colorVariables = {
  "--color-primary": colors.primary.DEFAULT,
  "--color-secondary": colors.secondary.DEFAULT,
  "--color-overlay": colors.overlay.rgba,
  "--color-text-primary": colors.text.primary,
  "--color-text-secondary": colors.text.secondary,
  "--color-background-dark": colors.background.dark,
} as const;

