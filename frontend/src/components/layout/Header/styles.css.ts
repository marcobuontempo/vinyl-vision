import { style } from "@vanilla-extract/css";

export const header = style({});

export const nav = style({
  height: "5rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid black",
});

export const box = style({
  flex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  selectors: {
    "&:first-child": {
      justifyContent: "flex-start",
    },
    "&:last-child": {
      justifyContent: "flex-end",
    },
  },
});

export const list = style([
  box,
  {
    gap: "1rem",
    listStyle: "none",
    padding: "0 1rem",
  },
]);

export const logo = style([
  box,
  {
    textAlign: "center",
  },
]);

export const inactive = style({
  selectors: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export const active = style({
  textShadow: "1px 0 0 black",
  textDecoration: "underline",
});
