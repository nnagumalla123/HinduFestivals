import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // fake browser so components can render in tests
    setupFiles: ["./vitest.setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
  },
  resolve: {
    // Mirror the "@/*" import alias from tsconfig.json
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
});
