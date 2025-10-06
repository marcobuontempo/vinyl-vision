import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const header = style({});

export const nav = style({
  height: vars.sizes.navbar,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: `2px solid ${vars.colors.complementary}`,
  background: vars.colors.primary,
  color: vars.colors.complementary,

  "@media": {
    "screen and (max-width: 768px)": {
      padding: `${vars.space.none} ${vars.space.lg}`,
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
    fontWeight: "bold",
    textDecoration: "underline",
    textDecorationColor: vars.colors.accent,
    selectors: {
      "&:hover": {
        transform: "scale(1.02)",
      },
      "&:active": {
        transform: "scale(1.05)",
      },
    },
  },
]);

export const logo = style([
  logoBase,
  {
    textAlign: "center",

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
