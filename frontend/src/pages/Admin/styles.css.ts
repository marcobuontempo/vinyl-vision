import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const admin = style({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.xxl,
});
