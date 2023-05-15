import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Morpion Game',
      orientation: "any",
      short_name: 'Morpion',
      description: 'A super Morpion Game',
      theme_color: '##c49129',
      icons: [
        {
          src: 'icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
})
