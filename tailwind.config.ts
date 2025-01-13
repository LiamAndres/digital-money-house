import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Ruta simplificada para escanear todo dentro de src.
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        greenCustom: "#C1FD35", // Verde especificado
        darkCustom: "#201F22",  // Gris oscuro especificado
        blackCustom: "#000000", // Negro especificado
      },
      fontSize: {
        'custom-48': '48px',
        'custom-34': '34px',
      },
    },
  },
  plugins: [],
} satisfies Config;
