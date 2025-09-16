import { style } from "@vanilla-extract/css";

export const card = style({
  position: "relative",
  aspectRatio: "1 / 1",
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid black",
  borderBottom: "1px solid black",

  selectors: {
    "&:hover::before": {
      content: "",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      border: "2px solid black",
      pointerEvents: "none",
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

export const text = style({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const details = style({
  flex: "1",
  visibility: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "1rem",
  zIndex: "1",

  selectors: {
    [`${card}:hover &`]: {
      visibility: "visible",
    },
  },
});

export const detail = style([
  text,
  {
    flex: "1",
  },
]);

export const expand = style({
  fontWeight: "bold",
  textAlign: "end",
});

export const footer = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  padding: "0.5rem",
  zIndex: "1",
});
