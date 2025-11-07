import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Carga las variables del .env correspondiente (ej: .env, .env.development, .env.production)
  const env = loadEnv(mode, process.cwd(), '')

  // env.VITE_API_URL contendrá el valor de VITE_API_URL
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
    },
  }
})
