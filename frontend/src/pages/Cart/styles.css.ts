import { style } from "@vanilla-extract/css";

export const cart = style({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
});

export const heading = style({
  padding: "2rem",
});

export const clear = style({
  background: "darkred",
  fontSize: "0.8rem",
});

export const empty = style({
  flex: "1",
  padding: "0 2rem",
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
  gap: "1rem",
  justifyContent: "space-between",
  alignItems: "end",
  padding: "1rem",
  fontSize: "1.5rem",
});

export const checkout = style({
  width: "100%",
});
