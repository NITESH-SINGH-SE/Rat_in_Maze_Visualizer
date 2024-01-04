import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Rat_in_Maze_Visualizer",
  plugins: [react()],
})
