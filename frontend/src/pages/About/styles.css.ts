import { keyframes, style } from "@vanilla-extract/css";

export const heading = style({
  padding: "2rem",
});

export const content = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
  padding: "2rem",
  paddingTop: "0",
});

export const paragraph = style({
  width: "100%",
  maxWidth: "50rem",
});

const slowRotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const vinyl = style({
  fontSize: "10rem",
  display: "inline-block",
  animation: `${slowRotate} 20s linear infinite`,
});
