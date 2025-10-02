import { style } from "@vanilla-extract/css";

export const button = style({
  border: "1px solid black",
  padding: "1rem",
  background: "black",
  color: "white",
  textAlign: "center",
  fontWeight: "bold",
  cursor: "pointer",

  selectors: {
    "&:hover:not(:disabled)": {
      border: "1px solid white",
      filter: "invert(1)",
    },
    "&:disabled": {
      filter: "invert(0.3)",
      cursor: "default",
    },
  },
});
