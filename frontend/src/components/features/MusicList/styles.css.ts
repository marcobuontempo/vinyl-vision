import { style } from "@vanilla-extract/css";

export const musicList = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
  borderLeft: "1px solid black",
});
