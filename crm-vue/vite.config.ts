import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
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
