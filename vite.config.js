import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    lib: {
      entry: './lib/index.ts',
      name: 'index',
      fileName: 'index',
    }
  },
  plugins: [
    viteStaticCopy({
      targets: [ 
        { src: 'lib/test.html', dest: '.' } ]
    })
  ]
}) ;
