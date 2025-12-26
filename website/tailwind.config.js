/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      animation: {
        float: "float 3s ease-in-out infinite",
        slideIn: "slideIn 1s ease-out forwards",
        "spin-slow": "spin 20s linear infinite",
        "ping-slow": "pingSlow 3s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateY(50px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pingSlow: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
      },
    },
  },
  plugins: [
    // Custom plugin to support 3D transforms and backface visibility
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".backface-hidden": { "backface-visibility": "hidden" },
        ".backface-visible": { "backface-visibility": "visible" },
        ".preserve-3d": { "transform-style": "preserve-3d" },
        ".transform-style-flat": { "transform-style": "flat" },
      });
    }),
  ],
};
