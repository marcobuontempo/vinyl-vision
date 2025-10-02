import { style } from "@vanilla-extract/css";

export const header = style({});

export const nav = style({
  height: "5rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid black",
});

export const box = style({
  flex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  selectors: {
    "&:first-child": {
      justifyContent: "flex-start",
    },
    "&:last-child": {
      justifyContent: "flex-end",
    },
  },
});

export const list = style([
  box,
  {
    gap: "1rem",
    listStyle: "none",
    padding: "0 1rem",
  },
]);

export const logo = style([
  box,
  {
    textAlign: "center",
  },
]);

export const active = style({
  textShadow: "1px 0 0 black",
  textDecoration: "underline",
});

export const inactive = style({
  cursor: "pointer",

  selectors: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export const activeAdmin = style([
  active,
  {
    color: "red",
    textShadow: "1px 0 0 red",
  },
]);

export const inactiveAdmin = style([
  inactive,
  {
    color: "red",
  },
]);

export const activeCart = style({
  position: "relative",
  fontSize: "2rem",
});

export const inactiveCart = style({
  position: "relative",
  fontSize: "2rem",
});

export const cartCount = style({
  position: "absolute",
  top: "0",
  left: "0",
  width: "110%",
  height: "100%",
  fontSize: "0.5rem",
  color: "white",
  textAlign: "center",
  paddingTop: "0.25rem",

  selectors: {
    [`${activeCart} &`]: {
      borderBottom: "2px solid black",
    },
    [`${inactiveCart}:hover &`]: {
      borderBottom: "2px solid black",
    },
  },
});
