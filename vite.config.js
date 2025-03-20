import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
        '/posts': {
            target: 'https://linked-posts.routemisr.com',
            changeOrigin: true,
            secure: false,
        },
    },
},
  plugins: [react()],
})
