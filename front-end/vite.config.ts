
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue()],

    // Cache em diretório preparado durante o Docker build
    cacheDir: '/tmp/vite-cache',

    server: {
      host: '0.0.0.0',
      port: Number(process.env.PORT) || 5173,
      strictPort: true,
      allowedHosts: true,

      proxy: {
        '/api': {
          target: env.VITE_API_DOMAIN || 'http://127.0.0.1:3333',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
