import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  publicDir:"/static",
  resolve:{
    alias:{
      "@":resolve(__dirname,"./src")
    }
  },
  server:{
    host:"0.0.0.0",
    port:80,
  },
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:`@import "./src/assets/sass/globalVar.scss";`
      }
    }
  }
})
