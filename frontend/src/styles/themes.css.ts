import { createGlobalTheme } from "@vanilla-extract/css";

export const root = createGlobalTheme(":root", {
  fonts: {
    heading: "Arial, sans-serif",
    body: "Verdana, sans-serif",
  },
  colors: {
    // Main
    primary: "ghostwhite",
    primaryTransparent: "rgba(248,248,255,0.8)",
    dark: "black",
    light: "white",

    // Secondary
    complementary: "rgb(15,15,15)",
    accent: "indigo",
    accentAlt: "purple",

    // Status
    error: "darkred",
    muted: "lightgrey",
    mutedAlt: "grey",
  },
  space: {
    none: "0",
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
    xl: "3rem",
    xxl: "4rem",
  },
  fontSizes: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
    xxxl: "4rem",
  },
  sizes: {
    navbar: "5rem",
    footer: "3rem",
    maxContent: "40rem",
  },
});

export const vars = { ...root };
