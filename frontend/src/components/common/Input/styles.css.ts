import { style } from "@vanilla-extract/css";

export const group = style({
  width: "100%",
  position: "relative",
  display: "grid",
  gridTemplateColumns: "1fr",
  border: "1px solid black",
  borderRight: "1px solid black",
  borderTop: "1px solid black",

  "@media": {
    "screen and (min-width: 768px)": {
      gridTemplateColumns: "12rem 1fr",
    },
  },
});

export const label = style({
  textWrap: "nowrap",
  borderRight: "none",
  borderBottom: "1px solid black",
  padding: "1rem",

  "@media": {
    "screen and (min-width: 768px)": {
      borderRight: "1px solid black",
      borderBottom: "none",
    },
  },
});

export const input = style({
  border: "none",
  padding: "1rem",

  selectors: {
    "&:focus": {
      outline: "2px solid black",
      zIndex: "1",
    },
  },
});
