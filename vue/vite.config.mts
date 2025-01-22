// Plugins
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: '../ui',
    emptyOutDir: true // also necessary
  },
  plugins: [
    Components({
      dirs: ['src/components'], // Carpeta donde están tus componentes
      extensions: ['vue'], // Extensiones que reconocerá
      deep: true, // Buscar componentes en subcarpetas
      resolvers: [
        VuetifyResolver() // Para importar automáticamente componentes de Vuetify
      ]
    }),
    AutoImport({
      /* options */

      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@/api/axios': [['default', 'api']] // Alias para Axios
        }
      ],
      dts: './auto-imports.d.ts' // Genera un archivo de tipos para TypeScript
    }),
    Vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true
    }),
    Components()
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
  },
  server: {
    port: 3000
  }
})
