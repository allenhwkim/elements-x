import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: "dist",
    // sourcemap: true,
    lib: {
      entry: {
        index: "./lib/index.ts",
        core: "./lib/core/index.ts",
        extended: "./lib/extended/index.ts",
      },
      formats: ["es", "cjs"],
    },
  }
}) ;
