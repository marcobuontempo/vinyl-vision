import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const error = style({
  textAlign: "center",
  color: vars.colors.error,
});
