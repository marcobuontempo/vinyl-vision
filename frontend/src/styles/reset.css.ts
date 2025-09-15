import { globalStyle } from "@vanilla-extract/css";

// Box-sizing rules
globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

// Remove default margin & padding
globalStyle("*", {
  margin: 0,
  padding: 0,
});

// Set core body defaults
globalStyle("body", {
  minHeight: "100vh",
  textRendering: "optimizeSpeed",
  lineHeight: 1.5,
  WebkitFontSmoothing: "antialiased",
});

// Set core root defaults
globalStyle("html:focus-within", {
  scrollBehavior: "smooth",
});

// Set core anchor settings
globalStyle("a", {
  textDecoration: "none",
  color: "inherit",
});

// Make images easier to work with
globalStyle("img, picture, video, canvas, svg", {
  display: "block",
  maxWidth: "100%",
});

// Inherit fonts for inputs and buttons
globalStyle("input, button, textarea, select", {
  font: "inherit",
});

// Improve line wrapping
globalStyle("p", {
  textWrap: "pretty",
});
globalStyle("h1, h2, h3, h4, h5, h6", {
  textWrap: "balance",
});

// Create root stacking context
globalStyle("#root", {
  isolation: "isolate",
});
