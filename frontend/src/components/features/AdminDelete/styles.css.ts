import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const heading = style({
  padding: vars.space.lg,
  textAlign: "center",
});

export const select = style({
  border: `1px solid ${vars.colors.complementary}`,
  padding: vars.space.md,

  selectors: {
    "&:focus": {
      outline: `1px solid ${vars.colors.complementary}`,
      zIndex: "1",
    },
  },
});
