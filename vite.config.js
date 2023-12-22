import { defineConfig } from 'vite';

export default defineConfig(({mode}) => {
  const dir = process.env.DIR;

  return { 
    define: {
      // vite + react uses process.env, although vite says import.meta.env
      'process.env': process.env 
    },
    assetsInclude: ['/sb-preview/runtime.js'],
    build: {
      emptyOutDir: false,
      lib: {
        entry: dir !== 'index' ? `./lib/${dir}/index.ts` : './lib/index.ts',
        name: dir || 'index',
        fileName: dir
      }
    }
  }
});