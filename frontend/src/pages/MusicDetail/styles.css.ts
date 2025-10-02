import { style } from "@vanilla-extract/css";

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
  padding: "2rem 0",
});

export const container = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  width: "100%",
  maxWidth: "60rem",
  border: "1px solid black",
});

export const artwork = style({
  width: "50%",
  objectFit: "cover",
  objectPosition: "center",
});

export const description = style({
  borderBottom: "1px solid black",
  padding: "2rem",
  textAlign: "center",
});

export const content = style({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderLeft: "1px solid black",
});

export const information = style({
  padding: "2rem",
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
