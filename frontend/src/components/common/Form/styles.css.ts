import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const form = style({
  width: "100%",
  maxWidth: vars.sizes.maxContent,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});
