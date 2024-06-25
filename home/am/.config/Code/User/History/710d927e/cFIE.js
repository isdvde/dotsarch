import {defineConfig} from "vite";
import {ViteEjsPlugin} from "vite-plugin-ejs";
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    // Without Data
    ViteEjsPlugin(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.ejs'),
      },
    },
  },
});