import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const errorDisplay = style({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: vars.space.md,
  textAlign: "center",
});

export const number = style({
  fontSize: vars.fontSizes.xxl,
  fontWeight: "normal",
});

export const button = style({
  width: "100%",
  maxWidth: vars.sizes.maxContent,
});
