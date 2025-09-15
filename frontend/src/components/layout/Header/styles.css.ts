import { style } from "@vanilla-extract/css";

export const header = style({});

export const nav = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const navItem = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  listStyle: "none",
});
