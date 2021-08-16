import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
const viteConfig = defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import "./src/assets/scss/colors";` }
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
export default viteConfig
