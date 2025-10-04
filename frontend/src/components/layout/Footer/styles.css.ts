import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const footer = style({
  height: vars.sizes.footer,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  background: vars.colors.primary,
  color: vars.colors.accent,
  fontSize: vars.fontSizes.sm,
});

export const copyright = style({
  padding: `${vars.space.none} ${vars.space.md}`,
});
