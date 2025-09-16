import { style } from "@vanilla-extract/css";

export const card = style({
  position: "relative",
  aspectRatio: "1 / 1",
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid black",
  borderBottom: "1px solid black",

  selectors: {
    "&:hover::after": {
      content: "",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      border: "2px solid black",
      zIndex: "2",
    },
  },
});

export const artwork = style({
  position: "absolute",
  top: "0px",
  left: "0px",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  pointerEvents: "none",
  zIndex: "0",

  selectors: {
    [`${card}:hover &`]: {
      filter: "blur(1px)",
    },
  },
});

export const header = style({
  width: "100%",
  padding: "0 1rem",
  background: "rgba(255,255,255,0.5)",
  zIndex: "1",
});

export const title = style({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const details = style({
  flex: "1",
  padding: "1rem",
  visibility: "hidden",
  zIndex: "1",

  selectors: {
    [`${card}:hover &`]: {
      visibility: "visible",
    },
  },
});

export const footer = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  padding: "0.5rem",
  zIndex: "1",
});

export const buy = style({
  cursor: "pointer",
});
