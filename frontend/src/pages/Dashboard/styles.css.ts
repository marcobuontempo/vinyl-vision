import { style } from "@vanilla-extract/css";

export const dashboard = style({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
});

export const heading = style({
  padding: "2rem",
  width: "100%",
});

export const update = style({
  width: "100%",
});

export const logout = style({
  width: "100%",
  maxWidth: "40rem",
  background: "darkred",
});

export const stateContainer = style({
  flex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const error = style({
  textAlign: "center",
  color: "red",
});
