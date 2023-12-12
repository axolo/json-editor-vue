import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // resolve: { dedupe: ['vue'] }, // https://github.com/vuejs/core/issues/3930
  plugins: [vue()],
  build: {
		lib: {
			entry: fileURLToPath(new URL('./src/components/index.js', import.meta.url)),
			name: '@axolo/json-editor-vue',
			fileName: 'index'
		},
    rollupOptions: {
      external: ['vue'],
      output: {
				globals: {
					vue: 'Vue'
				}
			}
    }
  }
})
