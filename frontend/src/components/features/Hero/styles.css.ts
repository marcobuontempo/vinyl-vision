import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const hero = style({
  height: `calc(0.67 * ${vars.sizes.maxContent})`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: vars.space.lg,
});

export const text = style({
  textAlign: "center",
});

export const subtext = style({
  fontSize: vars.fontSizes.md,
  fontWeight: "light",
  padding: vars.space.md,
  paddingBottom: vars.space.none,
});

export const cta = style({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignContent: "center",
  gap: vars.space.xl,
});

export const link = style({
  width: "100%",
  maxWidth: `calc(0.25 * ${vars.sizes.maxContent})`,
});
