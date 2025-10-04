import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const cart = style({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
});

export const heading = style({
  padding: vars.space.lg,
  borderBottom: `1px solid ${vars.colors.complementary}`,
});

export const clear = style({
  fontSize: vars.fontSizes.sm,
});

export const empty = style({
  flex: "1",
  padding: vars.space.lg,
});

export const list = style({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const footer = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  gap: vars.space.md,
  justifyContent: "space-between",
  alignItems: "end",
  padding: vars.space.md,
  fontSize: vars.fontSizes.lg,
});

export const checkout = style({
  width: "100%",
});
