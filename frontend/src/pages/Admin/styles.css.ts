import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const admin = style({
  flex: "1",
  display: "flex",
  justifyContent: "center",
});

export const heading = style({
  padding: vars.space.lg,
  textAlign: "center",
});
