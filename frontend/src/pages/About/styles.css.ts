import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const heading = style({
  padding: "2rem",
});

export const content = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: vars.space.lg,
  paddingTop: vars.space.none,
  textAlign: "justify",
});

export const group = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.lg,
  padding: vars.space.lg,
  paddingBottom: vars.space.md,
  background: vars.colors.light,
  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
});

export const paragraph = style({
  width: "100%",
  maxWidth: vars.sizes.maxContent,
});

const slowRotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const vinyl = style({
  fontSize: `calc(0.33 * ${vars.sizes.maxContent})`,
  display: "inline-block",
  animation: `${slowRotate} 20s linear infinite`,
  color: vars.colors.accent,
});
