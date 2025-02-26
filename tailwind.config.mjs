/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        georgia: ["Georgia", "serif"],
        cinzel: ["Cinzel", "serif"],
        rakkas: ["Rakkas", "cursive"],
        volkhov: ["Volkhov", "serif"],
        rage: ["Rage Italic", "cursive"],
        lusitana: ["Lusitana", "serif"],
      },
    },
  },
  plugins: [],
};
