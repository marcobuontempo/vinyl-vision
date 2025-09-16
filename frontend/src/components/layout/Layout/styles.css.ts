import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const layout = style({
  fontFamily: vars.fonts.body,
  backgroundColor: vars.colors.primary,
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

export const main = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  width: "100%",
});
