import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

const animationTime = 30;

const flowingGradient = keyframes({
  "0%": { backgroundPosition: "0% 50%" },
  "50%": { backgroundPosition: "100% 50%" },
  "100%": { backgroundPosition: "0% 50%" },
});

export const hero = style({
  height: `calc(0.67 * ${vars.sizes.maxContent})`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: vars.space.lg,

  background: `linear-gradient(
    270deg,
    ${vars.colors.primary},
    ${vars.colors.accent}
  )`,
  backgroundSize: "300% 500%",
  animation: `${flowingGradient} ${animationTime}s ease infinite alternate`,
});

const colourShift = keyframes({
  "0%": { color: vars.colors.light },
  "25%": { color: vars.colors.light },
  "75%": { color: vars.colors.dark },
  "100%": { color: vars.colors.dark },
});

export const text = style({
  textAlign: "center",
  color: vars.colors.light,
  animation: `${colourShift} ${animationTime / 2}s ease-in-out infinite alternate`,
});

export const subtext = style({
  fontSize: vars.fontSizes.md,
  fontWeight: "light",
  padding: vars.space.md,
  paddingBottom: vars.space.none,
});

export const cta = style({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignContent: "center",
  gap: vars.space.xl,
});

export const link = style({
  width: "100%",
  maxWidth: `calc(0.25 * ${vars.sizes.maxContent})`,
});
