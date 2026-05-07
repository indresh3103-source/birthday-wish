import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blush: "#ff8fbd",
        lavender: "#c7a5ff",
        peach: "#ffd1b8",
        champagne: "#fff6df",
        gold: "#ffd36e",
        midnight: "#13091f"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 45px rgba(255,143,189,.45)",
        gold: "0 0 35px rgba(255,211,110,.42)"
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        twinkle: "twinkle 2.8s ease-in-out infinite",
        flame: "flame 900ms ease-in-out infinite alternate",
        heartRain: "heartRain 11s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(-1deg)" },
          "50%": { transform: "translate3d(0,-22px,0) rotate(1deg)" }
        },
        twinkle: {
          "0%, 100%": { opacity: ".35", transform: "scale(.65)" },
          "50%": { opacity: "1", transform: "scale(1.2)" }
        },
        flame: {
          "0%": { transform: "scale(.88) rotate(-4deg)", filter: "blur(.2px)" },
          "100%": { transform: "scale(1.12) rotate(5deg)", filter: "blur(.8px)" }
        },
        heartRain: {
          "0%": { transform: "translateY(-15vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(115vh) rotate(360deg)", opacity: "0" }
        }
      }
    }
  },
  plugins: []
};

export default config;
