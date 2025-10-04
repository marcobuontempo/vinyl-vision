import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const musicList = style({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(calc(0.5 * ${vars.sizes.maxContent}), 1fr))`,
  borderLeft: `1px solid ${vars.colors.complementary}`,
});

export const stateContainer = style({
  flex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
