import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  /* 
    Load _env_ based on `mode` in the current working directory.  Set the third parameter 
    to '' to load all _env_ regardless of the `VITE_` prefix.
  */
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      open: false,
      host: true,
      port: env.APP_PORT ? Number(env.APP_PORT) : 5173
    },
    build: {
      outDir: 'dist'
    }
  }
  
})
