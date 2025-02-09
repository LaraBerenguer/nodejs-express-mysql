import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 80
  },  
  build: {
    outDir: path.join(__dirname, "dist")
  },
  base: "/",
});
