import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const detail = style({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const heading = style({
  textAlign: "center",
  padding: `${vars.space.lg} ${vars.space.none}`,
});

export const container = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  width: "100%",
  maxWidth: `calc(1.5 * ${vars.sizes.maxContent})`,
  border: `1px solid ${vars.colors.complementary}`,

  "@media": {
    "screen and (max-width: 768px)": {
      flexDirection: "column",
    },
  },
});

export const imagewrapper = style({
  position: "relative",
  width: "50%",
  height: "100%",
  aspectRatio: "1/1",
});

export const artwork = style({
  position: "absolute",
  top: "0",
  left: "0",
  height: "100%",
  width: "100%",
  objectFit: "cover",
  objectPosition: "center",

  "@media": {
    "screen and (max-width: 768px)": {
      width: "100%",
      height: `calc(0.75 * ${vars.sizes.maxContent})`,
    },
  },
});

export const placeholder = style([
  artwork,
  {
    opacity: 0.1,
    padding: vars.space.xxl,
  },
]);

export const description = style({
  borderBottom: `1px solid ${vars.colors.complementary}`,
  padding: vars.space.lg,
  textAlign: "center",
});

export const content = style({
  position: "relative",
  width: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderLeft: `1px solid ${vars.colors.complementary}`,

  "@media": {
    "screen and (max-width: 768px)": {
      width: "100%",
    },
  },
});

export const title = style({
  fontSize: vars.fontSizes.md,
  fontWeight: "normal",
});

export const information = style({
  padding: vars.space.lg,
});

export const price = style({
  textAlign: "end",
  fontWeight: "bold",
});

export const stateContainer = style({
  flex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const featured = style({
  position: "absolute",
  top: vars.space.xs,
  right: vars.space.xs,
  height: "1rem",
  width: "1rem",
  color: vars.colors.accentAlt,
  stroke: vars.colors.light,
  strokeWidth: "2rem",
});
