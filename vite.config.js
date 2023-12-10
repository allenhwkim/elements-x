import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

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
  },
  plugins: [
    viteStaticCopy({
      targets: [ 
        { src: 'lib/test.html', dest: '.' } ]
    })
  ]
}) ;
