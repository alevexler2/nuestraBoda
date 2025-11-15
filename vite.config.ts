import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const target = env.VITE_API_URL || 'http://localhost:8000'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          secure: false,
        },
      },
      // 👇 Agregá esta línea con tu host de Cloudflare
      allowedHosts: [
        'neil-battery-cute-friend.trycloudflare.com',
      ],
    },
  }
})
