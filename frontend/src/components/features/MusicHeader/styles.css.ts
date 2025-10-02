import { style } from "@vanilla-extract/css";

export const header = style({
  borderBottom: "1px solid black",
  display: "flex",
  flexDirection: "column",
  alignItems: "end",
});

export const main = style({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
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

export const open = style({
  textShadow: "1px 0 0 black",
});

export const form = style({
  visibility: "hidden",
  display: "flex",
  height: "0",
  filter: "opacity(0)",
  width: "100%",
  maxWidth: "40rem",
  flexDirection: "column",
  justifyContent: "center",
  gap: "0.5rem",
  transition: "filter 200ms ease-in-out",
});

export const show = style({
  visibility: "visible",
  padding: "2rem",
  paddingTop: "0",
  height: "auto",
  filter: "opacity(1)",
});

export const select = style({
  border: "1px solid black",
  padding: "1rem",

  selectors: {
    "&:focus": {
      outline: "1px solid black",
      zIndex: "1",
    },
  },
});
