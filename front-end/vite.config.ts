import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const useLocalProxy = true
  console.log({useLocalProxy})
  console.log('ENV:', env)
  return {
    plugins: [vue()],
    server: {
      proxy: {
        '/api': useLocalProxy
          ? {
              target: 'http://127.0.0.1:3333',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ''),
            }
          : {
              target: env.VITE_API_DOMAIN,
              changeOrigin: true,
            },
      },
    },
  }
})