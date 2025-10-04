import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const item = style({
  position: "relative",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: vars.space.md,

  selectors: {
    "&::after": {
      content: "",
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      borderBottom: `1px solid ${vars.colors.complementary}`,
      pointerEvents: "none",
    },
  },

  "@media": {
    "screen and (max-width: 768px)": {
      flexDirection: "column",
      justifyContent: "center",
    },
  },
});

export const artwork = style({
  height: "4rem",
  width: "25%",
  objectFit: "cover",
  objectPosition: "center",

  "@media": {
    "screen and (max-width: 768px)": {
      width: "100%",
    },
  },
});

export const info = style({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "25%",

  "@media": {
    "screen and (max-width: 768px)": {
      width: "100%",
    },
  },
});

export const title = style({
  fontWeight: "bold",
});

export const remove = style({
  "@media": {
    "screen and (max-width: 768px)": {
      width: "100%",
    },
  },
});
