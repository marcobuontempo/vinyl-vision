import { style } from "@vanilla-extract/css";

export const featured = style({});

export const title = style({
  width: "100%",
  textAlign: "center",
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  padding: "0.5rem",
});

export const list = style({
  width: "100%",
  display: "flex",
  justifyContent: "left",
  overflowX: "scroll",
});

export const item = style({
  minWidth: "20rem",
  maxWidth: "20rem",
  border: "1px solid black",
  background: "grey",
});

export const stateContainer = style({
  flex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
