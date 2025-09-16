import { style } from "@vanilla-extract/css";

export const group = style({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "10rem 1fr",
  alignItems: "center",
  fontSize: "1rem",
});

export const label = style({
  textWrap: "nowrap",
});

export const input = style({});
