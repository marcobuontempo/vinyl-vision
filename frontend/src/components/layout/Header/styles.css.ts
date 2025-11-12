import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const header = style({});

export const nav = style({
  position: "relative",
  height: vars.sizes.navbar,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: `2px solid ${vars.colors.complementary}`,
  color: vars.colors.complementary,

  // Bottom shadow only
  boxShadow: `0 5px 20px color-mix(in srgb, ${vars.colors.accent} 10%, transparent)`,

  "@media": {
    "screen and (max-width: 768px)": {
      padding: `${vars.space.none} ${vars.space.lg}`,
      justifyContent: "space-between",
    },
  },
});

export const burger = style({
  display: "none",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: vars.fontSizes.lg,
  "@media": {
    "screen and (max-width: 768px)": {
      display: "block",
    },
  },
});

export const navGroup = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  "@media": {
    "screen and (max-width: 768px)": {
      display: "none",
      position: "fixed",
      top: vars.space.none,
      left: vars.space.none,
      gap: vars.space.md,
      paddingTop: vars.space.md,
      fontSize: vars.fontSizes.lg,
      flexDirection: "column",
      justifyContent: "center",
      height: `calc(100dvh - ${vars.sizes.navbar})`,
      width: "100dvw",
      background: vars.colors.primary,
      zIndex: "9999",
    },
  },
});

export const navGroupOpen = style({
  "@media": {
    "screen and (max-width: 768px)": {
      display: "flex !important",
      marginTop: vars.sizes.navbar,
    },
  },
});

export const box = style({
  flex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  selectors: {
    "&:first-child": {
      justifyContent: "flex-start",
    },
    "&:last-child": {
      justifyContent: "flex-end",
    },
  },

  "@media": {
    "screen and (max-width: 768px)": {
      selectors: {
        "&:first-child": {
          justifyContent: "flex-end",
        },
        "&:last-child": {
          justifyContent: "flex-start",
        },
      },
    },
  },
});

export const list = style([
  box,
  {
    gap: vars.space.md,
    listStyle: "none",
    padding: `${vars.space.none} ${vars.space.md}`,

    "@media": {
      "screen and (max-width: 768px)": {
        flexDirection: "column",
      },
    },
  },
]);

const logoBase = style([
  box,
  {
    selectors: {
      "&:hover": {
        transform: "scale(1.02)",
        // Converts black to indigo
        filter:
          "brightness(0) saturate(100%) invert(15%) sepia(69%) saturate(5487%) hue-rotate(274deg) brightness(54%) contrast(116%)",
      },
      "&:active": {
        transform: "scale(1.05)",
        // Converts black to purple
        filter:
          "brightness(0) saturate(100%) invert(13%) sepia(65%) saturate(6446%) hue-rotate(294deg) brightness(69%) contrast(111%)",
      },
    },
  },
]);

export const logo = style([
  logoBase,
  {
    height: `calc(${vars.sizes.navbar} * 0.5)`,
    "@media": {
      "screen and (max-width: 768px)": {
        display: "none",
      },
    },
  },
]);

export const logoMobile = style([
  logoBase,
  {
    display: "none",
    height: `calc(${vars.sizes.navbar} * 0.5)`,
    "@media": {
      "screen and (max-width: 768px)": {
        display: "block",
      },
    },
  },
]);

export const active = style({
  textShadow: `1px 0 0 ${vars.colors.complementary}`,
  textDecoration: "underline",
});

export const inactive = style({
  cursor: "pointer",

  selectors: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export const activeAdmin = style([
  active,
  {
    color: vars.colors.accent,
    textShadow: `1px 0 0 ${vars.colors.accent}`,
  },
]);

export const inactiveAdmin = style([
  inactive,
  {
    color: vars.colors.accent,
  },
]);

const cart = style({
  position: "relative",
  fontSize: vars.fontSizes.xl,
  "@media": {
    "screen and (max-width: 768px)": {
      display: "block",
      fontSize: vars.fontSizes.xxl,
    },
  },
});

export const activeCart = style([cart]);

export const inactiveCart = style([cart]);

export const cartCount = style({
  position: "absolute",
  top: vars.space.none,
  left: vars.space.none,
  width: "110%",
  height: "100%",
  fontSize: vars.fontSizes.xs,
  color: vars.colors.primary,
  textAlign: "center",
  paddingTop: `calc(0.6 * ${vars.fontSizes.xs})`,

  selectors: {
    [`${activeCart} &`]: {
      borderBottom: `2px solid ${vars.colors.complementary}`,
    },
    [`${inactiveCart}:hover &`]: {
      borderBottom: `2px solid ${vars.colors.complementary}`,
    },
  },

  "@media": {
    "screen and (max-width: 768px)": {
      fontSize: vars.fontSizes.sm,
      paddingTop: `calc(0.6 * ${vars.fontSizes.sm})`,
    },
  },
});
