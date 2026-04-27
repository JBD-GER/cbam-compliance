import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#07183d",
        ink: "#132238",
        accent: "#41796a"
      },
      boxShadow: {
        glass: "0 24px 70px rgba(7, 24, 61, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
