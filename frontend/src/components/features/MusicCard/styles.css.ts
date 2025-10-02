import { style } from "@vanilla-extract/css";

export const card = style({
  position: "relative",
  aspectRatio: "1 / 1",
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid black",
  borderBottom: "1px solid black",
  cursor: "default",

  selectors: {
    "&::before": {
      content: "",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      border: "2px solid transparent",
      pointerEvents: "none",
      transition: "border 200ms ease",
      zIndex: "2",
    },
    "&:hover::before": {
      border: "2px solid black",
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
  transition: "filter 200ms ease",

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
  opacity: 0,
  transition: "all 200ms ease",
  zIndex: "1",

  selectors: {
    [`${card}:hover &`]: {
      visibility: "visible",
      opacity: 1,
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

  selectors: {
    "&:hover": {
      textDecoration: "underline",
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
