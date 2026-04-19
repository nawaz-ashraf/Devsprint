import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                surface: {
                    950: "#050510",
                    900: "#09091a",
                    800: "#121232",
                    700: "#1e1e4d",
                },
                neon: {
                    cyan: "#22d3ee",
                    blue: "#3b82f6",
                    purple: "#8b5cf6",
                },
            },
            boxShadow: {
                "glow-cyan": "0 0 30px rgba(34, 211, 238, 0.35)",
                "glow-purple": "0 0 30px rgba(139, 92, 246, 0.35)",
                glass: "0 8px 40px rgba(7, 7, 27, 0.45)",
            },
            backgroundImage: {
                "hero-mesh":
                    "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.30), transparent 42%), radial-gradient(circle at 80% 0%, rgba(139,92,246,0.24), transparent 40%), radial-gradient(circle at 50% 100%, rgba(34,211,238,0.20), transparent 45%)",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-12px)" },
                },
                "border-flow": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "100%": { backgroundPosition: "200% 50%" },
                },
            },
            animation: {
                float: "float 8s ease-in-out infinite",
                "border-flow": "border-flow 3.6s linear infinite",
            },
        },
    },
    plugins: [],
};

export default config;