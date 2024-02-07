import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig({
  // resolve: { dedupe: ['vue'] }, // https://github.com/vuejs/core/issues/3930
  plugins: [
    vue(),
    libInjectCss() // https://github.com/vitejs/vite/issues/1579
  ],
  build: {
		lib: {
			entry: fileURLToPath(new URL('./src/components/index.js', import.meta.url)),
			name: 'AxoloJsonEditor',
			fileName: 'index'
		},
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
				},
			}
    }
  }
})
