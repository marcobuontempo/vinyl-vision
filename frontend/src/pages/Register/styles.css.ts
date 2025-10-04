import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const register = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: `${vars.space.lg} ${vars.space.none}`,
});

export const info = style({
  padding: vars.space.sm,
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
