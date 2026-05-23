import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ["var(--font-space)", "sans-serif"],
                body: ["var(--font-inter)", "sans-serif"],
                mono: ["var(--font-jetbrains)", "monospace"],
            },
            boxShadow: {
                glow: "0 0 24px rgba(124,58,237,0.3)",
                card: "0 4px 24px rgba(0,0,0,0.4)",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
            animation: {
                float: "float 3s ease-in-out infinite",
                "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
            },
        },
    },
    plugins: [],
}

export default config