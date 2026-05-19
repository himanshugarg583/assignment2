/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#08213C",
        green: "#3CB98C",
        ink: "#051423"
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 35px rgba(60, 185, 140, 0.35)",
        soft: "0 20px 60px rgba(5, 20, 35, 0.45)"
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(60% 60% at 50% 40%, rgba(60, 185, 140, 0.25), rgba(8, 33, 60, 0))",
        "mesh-dark": "radial-gradient(circle at 20% 20%, rgba(60, 185, 140, 0.12), transparent 45%), radial-gradient(circle at 80% 10%, rgba(0, 100, 160, 0.15), transparent 40%), radial-gradient(circle at 70% 80%, rgba(60, 185, 140, 0.15), transparent 45%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" }
        },
        routeDash: {
          "0%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "-220" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 26s linear infinite",
        "glow-pulse": "glowPulse 2.8s ease-in-out infinite",
        "route-dash": "routeDash 6s linear infinite",
        shimmer: "shimmer 8s linear infinite"
      }
    }
  },
  plugins: []
};
