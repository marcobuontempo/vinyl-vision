import { style } from "@vanilla-extract/css";

export const spotlight = style({
  
});

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
  width: "380px",
  minWidth: "380px",
  height: "380px",
  minHeight: "380px",
  border: "1px solid black",
  background: "grey",
});
