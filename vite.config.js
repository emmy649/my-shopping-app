import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/my-shopping-app/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png'],
      manifestFilename: 'manifest.json',
      manifest: {
        name: 'Моят план',
        short_name: 'План',
        start_url: '/my-shopping-app/',
        scope: '/my-shopping-app/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#a1e3b1',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }
    })
  ]
})
