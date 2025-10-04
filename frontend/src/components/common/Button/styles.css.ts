import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const button = style({
  padding: vars.space.md,
  textAlign: "center",
  fontWeight: "bold",
  cursor: "pointer",

  selectors: {
    "&:hover:not(:disabled)": {
      border: `1px solid ${vars.colors.primary}`,
    },
    "&:disabled": {
      filter: "invert(0.3)",
      cursor: "default",
      border: `1px solid ${vars.colors.muted}`,
      background: vars.colors.mutedAlt,
      color: vars.colors.muted,
    },
    "&:active:not(:disabled)": {
      transform: "scale(0.98)",
    },
  },
});

export const primary = style([
  button,
  {
    border: `1px solid ${vars.colors.primary}`,
    background: vars.colors.complementary,
    color: vars.colors.primary,

    selectors: {
      "&:hover:not(:disabled)": {
        border: `1px solid ${vars.colors.complementary}`,
        background: vars.colors.light,
        color: vars.colors.complementary,
      },
    },
  },
]);

export const secondary = style([
  button,
  {
    border: `1px solid ${vars.colors.complementary}`,
    background: vars.colors.light,
    color: vars.colors.complementary,

    selectors: {
      "&:hover:not(:disabled)": {
        border: `1px solid ${vars.colors.primary}`,
        background: vars.colors.complementary,
        color: vars.colors.primary,
      },
    },
  },
]);

export const accent = style([
  button,
  {
    border: `1px solid ${vars.colors.dark}`,
    background: vars.colors.accent,
    color: vars.colors.primary,

    selectors: {
      "&:hover:not(:disabled)": {
        border: `1px solid ${vars.colors.complementary}`,
        background: vars.colors.accentAlt,
        color: vars.colors.primary,
      },
    },
  },
]);

export const danger = style([
  button,
  {
    border: `1px solid ${vars.colors.complementary}`,
    background: vars.colors.light,
    color: vars.colors.complementary,

    selectors: {
      "&:hover:not(:disabled)": {
        border: `1px solid ${vars.colors.dark}`,
        background: vars.colors.error,
        color: vars.colors.primary,
      },
    },
  },
]);
