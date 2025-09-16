import { style } from "@vanilla-extract/css";

export const base = style({
  border: "1px solid black",
  padding: "1rem",
  background: "white",
  color: "black",
  textAlign: "center",

  selectors: {
    "&:hover": {
      filter: "invert(1)",
    },
  },
});
