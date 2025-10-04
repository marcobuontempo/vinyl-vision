import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const dashboard = style({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.lg,
});

export const heading = style({
  padding: vars.space.lg,
  width: "100%",
});

export const update = style({
  width: "100%",
});

export const logout = style({
  width: "100%",
  maxWidth: vars.sizes.maxContent,
});

export const stateContainer = style({
  flex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
