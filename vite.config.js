import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/my-shopping-app/',
  plugins: [
    react(),
    VitePWA({
      manifestFilename: 'manifest.json',
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png', 'icon-180.png'],
      manifest: {
        name: 'Моят план',
        short_name: 'Органайзер',
        start_url: '/my-shopping-app/',
        scope: '/my-shopping-app/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: 'bg-white',
        icons: [
          {
            src: '/my-shopping-app/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/my-shopping-app/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/my-shopping-app/icon-180.png',
            sizes: '180x180',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    sourcemap: true
  }
})
