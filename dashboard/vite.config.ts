import { resolve } from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'

export default defineConfig(({ mode }) => {
  // const prod = mode === 'production'

  return {
    root: resolve(__dirname, 'src'),
    // publicDir: resolve(__dirname, 'public'),
    // build: {
    //   outDir: resolve(__dirname, 'dist'),
    //   emptyOutDir: true,
    //   minify: prod,
    // },
    // resolve: {
    //   alias: {
    //     $lib: resolve(__dirname, 'src/lib'),
    //   },
    // },
    plugins: [
      svelte({
        preprocess: sveltePreprocess({ typescript: true, postcss: true }),
      }),
    ],
  }
})
