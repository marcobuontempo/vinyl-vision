import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const h1 = style({
  fontSize: vars.fontSizes.xl,
  fontWeight: "normal",
  fontFamily: vars.fonts.heading
});
