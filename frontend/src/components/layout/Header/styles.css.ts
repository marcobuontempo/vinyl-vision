import { style } from "@vanilla-extract/css";

export const header = style({});

export const nav = style({
  height: "5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "1px solid black",

  "@media": {
    "screen and (max-width: 768px)": {
      padding: "0 2rem",
    },
  },
});

export const burger = style({
  display: "none",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "1.5rem",
  "@media": {
    "screen and (max-width: 768px)": {
      display: "block",
    },
  },
});

export const navGroup = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  "@media": {
    "screen and (max-width: 768px)": {
      display: "none",
      position: "fixed",
      top: "0",
      left: "0",
      gap: "1rem",
      paddingTop: "1rem",
      fontSize: "1.5rem",
      flexDirection: "column",
      justifyContent: "center",
      height: "calc(100dvh - 5rem)",
      width: "100dvw",
      background: "white",
      zIndex: "9999",
    },
  },
});

export const navGroupOpen = style({
  "@media": {
    "screen and (max-width: 768px)": {
      display: "flex !important",
      marginTop: "5rem",
    },
  },
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

  "@media": {
    "screen and (max-width: 768px)": {
      selectors: {
        "&:first-child": {
          justifyContent: "flex-end",
        },
        "&:last-child": {
          justifyContent: "flex-start",
        },
      },
    },
  },
});

export const list = style([
  box,
  {
    gap: "1rem",
    listStyle: "none",
    padding: "0 1rem",

    "@media": {
      "screen and (max-width: 768px)": {
        flexDirection: "column",
      },
    },
  },
]);

export const logo = style([
  box,
  {
    textAlign: "center",
    "@media": {
      "screen and (max-width: 768px)": {
        display: "none",
      },
    },
  },
]);

export const logoMobile = style([
  box,
  {
    display: "none",
    "@media": {
      "screen and (max-width: 768px)": {
        display: "block",
      },
    },
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

const cart = style({
  position: "relative",
  fontSize: "2rem",
  "@media": {
    "screen and (max-width: 768px)": {
      display: "block",
      fontSize: "3rem",
    },
  },
});

export const activeCart = style([cart]);

export const inactiveCart = style([cart]);

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

  "@media": {
    "screen and (max-width: 768px)": {
      paddingTop: "0.4rem",
      fontSize: "0.75rem",
    },
  },
});
