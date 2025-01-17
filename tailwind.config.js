/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      rubik: ["Custom", "sans-serif"],
      QuickSand: ["Custom1", "sans-serif"],
      Pacifico: ["Custom2", "sans-serif"],
    },
    extend: {
      animation: {
        jump: "jump 0.2s ease-in-out", // Define the jump animation
        sink: "sink 0.2s ease-in-out", // Define the sink animation
      },
      keyframes: {
        jump: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        sink: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
      },
    },

  },
  plugins: [
    require('tailwindcss-animate'), // Ensure the plugin is added (if installed)
  ],
};
