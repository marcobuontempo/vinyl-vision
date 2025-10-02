import { style } from "@vanilla-extract/css";

export const musicList = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
  borderLeft: "1px solid black",
});

export const stateContainer = style({
  flex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
