/** Locked iNexConnect brand values. Mirror of theme.css for code use. */
export const brand = {
  name: "iNexConnect",
  tagline: "Idea • Build • Grow",
  email: "inexconnect@gmail.com",
  colors: {
    charcoal: "#232323",
    coral: "#FF5C50",
    white: "#FFFFFF",
    slate: "#5B5B60",
    mist: "#F7F7F8",
    line: "#E7E7EA",
  },
  radius: {
    card: "20px",
  },
} as const;

export type Brand = typeof brand;
