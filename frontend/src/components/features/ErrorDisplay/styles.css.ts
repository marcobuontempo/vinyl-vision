import { style } from "@vanilla-extract/css";

export const errorDisplay = style({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  textAlign: "center",
});

export const number = style({
  fontSize: "3rem",
  fontWeight: "normal",
});

export const button = style({
  width: "100%",
  maxWidth: "30rem",
});
