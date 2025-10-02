import { style } from "@vanilla-extract/css";

export const login = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem 0",
});

export const info = style({
  padding: "0.5rem",
  fontStyle: "italic",
});

export const link = style({
  fontWeight: "bold",

  selectors: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export const error = style({
  textAlign: "center",
});
