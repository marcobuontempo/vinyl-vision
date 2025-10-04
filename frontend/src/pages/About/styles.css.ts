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
  gap: vars.space.lg,
  padding: vars.space.lg,
  paddingTop: vars.space.none,
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
});
