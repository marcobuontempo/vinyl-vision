import { style } from "@vanilla-extract/css";

export const hero = style({
  height: "426px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "2rem",
});

export const text = style({
  textAlign: "center",
});

export const subtext = style({
  fontSize: "1rem",
  fontWeight: "light",
});

export const cta = style({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignContent: "center",
  gap: "3rem",
});

export const link = style({
  width: "100%",
  maxWidth: "10rem",
});
