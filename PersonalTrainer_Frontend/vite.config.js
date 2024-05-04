import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/PersonalTrainer_Frontend',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
