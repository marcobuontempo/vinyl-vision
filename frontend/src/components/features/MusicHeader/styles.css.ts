import { style } from "@vanilla-extract/css";

export const header = style({
  borderBottom: "1px solid black",
});

export const main = style({
  display: "flex",
  justifyContent: "space-between",
  padding: "2rem",
});

export const filter = style({
  appearance: "none",
  border: "none",
  background: "none",
  cursor: "pointer",

  selectors: {
    "&:hover": {
      textShadow: "1px 0 0 black",
    },
  },
});

export const form = style({
  display: "none",
  padding: "2rem",
  paddingTop: "0",
  flexDirection: "column",
  justifyContent: "center",
});

export const show = style({
  display: "flex",
});
