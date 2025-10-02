import { style } from "@vanilla-extract/css";

export const item = style({
  position: "relative",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",

  selectors: {
    "&::after": {
      content: "",
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      borderBottom: "1px solid black",
      pointerEvents: "none",
    },
  },
});

export const artwork = style({
  height: "4rem",
  width: "25%",
  objectFit: "cover",
  objectPosition: "center",
});

export const info = style({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "25%",
});
