import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const header = style({
  borderBottom: `1px solid ${vars.colors.complementary}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "end",
});

export const main = style({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  padding: vars.space.lg,
});

export const filter = style({
  appearance: "none",
  border: "none",
  background: "none",
  color: vars.colors.accent,
  cursor: "pointer",

  selectors: {
    "&:hover": {
      textShadow: `1px 0 0 ${vars.colors.accent}`,
    },
  },
});

export const open = style({
  textShadow: `1px 0 0 ${vars.colors.complementary}`,
});

export const form = style({
  visibility: "hidden",
  display: "flex",
  height: "0",
  filter: "opacity(0)",
  width: "100%",
  maxWidth: vars.sizes.maxContent,
  flexDirection: "column",
  justifyContent: "center",
  gap: vars.space.sm,
  transition: "filter 200ms ease-in-out",
});

export const show = style({
  visibility: "visible",
  padding: vars.space.lg,
  paddingTop: vars.space.none,
  height: "auto",
  filter: "opacity(1)",
});

export const select = style({
  border: `1px solid ${vars.colors.complementary}`,
  padding: vars.space.md,

  selectors: {
    "&:focus": {
      outline: `1px solid ${vars.colors.complementary}`,
      zIndex: "1",
    },
  },
});
