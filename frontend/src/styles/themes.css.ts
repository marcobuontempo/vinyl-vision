import { createGlobalTheme } from "@vanilla-extract/css";

export const root = createGlobalTheme(":root", {
  fonts: {
    body: "Verdana, sans-serif",
  },
  colors: {
    primary: "white",
  },
  space: {},
  fontSizes: {},
  fontWeights: {},
});

export const vars = { ...root };
