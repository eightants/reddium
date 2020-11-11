// tailwind.config.js
module.exports = {
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    screens: {
      xl: { max: "1579px" },
      lg: { max: "1200px" },
      md: { max: "900px" },
      sm: { max: "720px" }
    }
  }
};
