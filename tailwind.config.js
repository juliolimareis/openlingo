/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/@abifa-ui/components/**/*.{js,vue,ts}",
    "./@abifa-ui/components/**/*.{js,vue,ts}",
    "./app.vue"
  ],
  // important: true,
  theme: {
    extend: {
      colors: {
        primary : "#4299e1",
        secondary: "#1f2937"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
