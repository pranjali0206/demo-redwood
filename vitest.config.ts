// Unit tests run with a plain config, separate from the app's Vite/TanStack Start setup.
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});
