import { style } from "@vanilla-extract/css";

export const group = style({
  width: "100%",
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  border: "1px solid black",
  borderRight: "1px solid black",
  borderTop: "1px solid black",
});

export const label = style({
  textWrap: "nowrap",
  borderRight: "none",
  borderBottom: "1px solid black",
  padding: "1rem",
  width: "100%",

  "@media": {
    "screen and (min-width: 768px)": {
      borderRight: "1px solid black",
      borderBottom: "none",
      width: "12rem",
    },
  },
});

export const input = style({
  border: "none",
  padding: "1rem",
  flex: "1",

  selectors: {
    "&:focus": {
      outline: "2px solid black",
      zIndex: "1",
    },
  },
});
