import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // server: {
  //   host: '192.168.1.243',  // Change to your desired host
  //   port: 3001,  // Set to your desired port
  // }
})
