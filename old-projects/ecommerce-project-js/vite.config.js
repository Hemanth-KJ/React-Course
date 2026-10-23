import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(react({
  babel: {
    plugins: [['babel-plugin-react-compiler', { target: '19' }]],
  },
}))],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
      "/images": {
        target: "http://localhost:3000",
      },
    },
  },
});