import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const card = style({
  position: "relative",
  aspectRatio: "1 / 1",
  display: "flex",
  flexDirection: "column",
  borderRight: `1px solid ${vars.colors.complementary}`,
  borderBottom: `1px solid ${vars.colors.complementary}`,
  cursor: "default",

  selectors: {
    "&::before": {
      content: "",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: vars.space.none,
      left: vars.space.none,
      border: "2px solid transparent",
      pointerEvents: "none",
      transition: "border 200ms ease",
      zIndex: "2",
    },
    "&:hover::before": {
      border: `2px solid ${vars.colors.accent}`,
    },
  },
});

export const artwork = style({
  position: "absolute",
  top: vars.space.none,
  left: vars.space.none,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  zIndex: "0",
  transition: "filter 200ms ease",
  filter: "",

  selectors: {
    [`${card}:hover &`]: {
      filter: "blur(2px) grayscale(0.5)",
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

export const header = style({
  width: "100%",
  padding: `${vars.space.none} ${vars.space.md}`,
  background: vars.colors.primary,
  zIndex: "1",
});

export const text = style({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const artist = style([
  text,
  {
    fontWeight: "lighter",
  },
]);

export const details = style({
  flex: "1",
  visibility: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: vars.space.md,
  opacity: "0",
  transition: "opacity 200ms ease",
  zIndex: "1",

  selectors: {
    [`${card}:hover &`]: {
      visibility: "visible",
      opacity: "1",
      background: vars.colors.primaryTransparent,
    },
  },
});

export const detail = style([
  text,
  {
    flex: "1",
  },
]);

export const expandContainer = style({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
});

export const expand = style({
  fontWeight: "bold",
  textAlign: "end",
  color: vars.colors.accent,

  selectors: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export const footer = style({
  position: "relative",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  padding: vars.space.sm,
  zIndex: "1",

  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      width: "100%",
      height: "100%",
      top: vars.space.none,
      left: vars.space.none,
      opacity: "0",
      transition: "opacity 200ms ease",
      zIndex: "-1",
    },
    [`${card}:hover &::before`]: {
      opacity: "1",
      background: vars.colors.primaryTransparent,
    },
  },
});

export const price = style({
  background: vars.colors.primaryTransparent,
  width: "6rem",
  textAlign: "center",
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
