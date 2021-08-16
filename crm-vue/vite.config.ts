import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
const colorsPath = resolve(__dirname, './src/assets/scss/colors')
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import "${colorsPath}";` }
    }
  },
  build: {
    sourcemap: true
  },
  plugins: [
    vue({
      script: {
        refSugar: true
      }
    }),
    eslintPlugin()
  ],

  server: {
    port: 8080
  }
})
