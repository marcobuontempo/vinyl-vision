import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const featured = style({});

export const title = style({
  width: "100%",
  textAlign: "center",
  borderTop: `1px solid ${vars.colors.complementary}`,
  borderBottom: `1px solid ${vars.colors.complementary}`,
  padding: vars.space.sm,
  fontFamily: vars.fonts.heading,
});

export const list = style({
  width: "100%",
  display: "flex",
  justifyContent: "left",
  overflowX: "scroll",
});

export const item = style({
  width: `calc(0.5 * ${vars.sizes.maxContent})`,
  height: `calc(0.5 * ${vars.sizes.maxContent})`,
});

export const stateContainer = style({
  flex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderTop: `1px solid ${vars.colors.complementary}`,
  borderBottom: `1px solid ${vars.colors.complementary}`,
});
