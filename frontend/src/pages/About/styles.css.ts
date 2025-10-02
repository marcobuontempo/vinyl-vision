import { style } from "@vanilla-extract/css";

export const heading = style({
  padding: "2rem",
});

export const content = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
});

export const paragraph = style({
  width: "100%",
  maxWidth: "50rem",
});
