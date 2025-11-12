import { globalFontFace, style } from "@vanilla-extract/css";

// Fonts
export const montserrat = "GlobalMontserrat";

globalFontFace(montserrat, [
  {
    src: 'url("/fonts/Montserrat/Montserrat-VariableFont_wght.ttf") format("truetype")',
    fontStyle: "normal",
    fontWeight: "100 900",
  },
  {
    src: 'url("/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf") format("truetype")',
    fontStyle: "italic",
    fontWeight: "100 900",
  },
]);

export const montserratFont = style({ fontFamily: montserrat });
