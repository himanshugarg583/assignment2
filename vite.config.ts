import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true";

  return {
    plugins: [react()],
    base: isVercel ? "/" : "/assignment2/"
  };
});
