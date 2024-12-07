import type { Config } from "tailwindcss";

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
        gray: {
          1000: '#0D0D0D', 
          50:"rgba(250, 251, 252, 1)"
        },
      },
      boxShadow: {
        'soft': '0px 1px 1px -0.5px rgba(0, 0, 0, 0.03)', 
      },
    },
  },
  plugins: [],
} satisfies Config;
