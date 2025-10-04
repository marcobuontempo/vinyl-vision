import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const group = style({
  width: "100%",
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  border: `1px solid ${vars.colors.complementary}`,
});

export const label = style({
  textWrap: "nowrap",
  borderRight: "none",
  borderBottom: `1px solid ${vars.colors.complementary}`,
  padding: vars.space.md,
  width: "100%",
  background: vars.colors.light,

  "@media": {
    "screen and (min-width: 768px)": {
      borderRight: `1px solid ${vars.colors.complementary}`,
      borderBottom: "none",
      width: "14rem",
    },
  },
});

export const input = style({
  border: "none",
  padding: vars.space.md,
  flex: "1",
  background: vars.colors.light,

  selectors: {
    "&:focus": {
      outline: `2px solid ${vars.colors.complementary}`,
      zIndex: "1",
    },
    "textarea&": {
      height: "5rem",
    },
    "&[type='checkbox']": {
      appearance: "none",
      cursor: "pointer",
    },
    "&[type='checkbox']::after": {
      content: "✗",
      textAlign: "center",
      width: "100%",
      display: "block",
      color: vars.colors.complementary,
    },
    "&[type='checkbox']:checked::after": {
      content: "✓",
      background: vars.colors.accent,
      color: vars.colors.primary,
    },
  },
});
