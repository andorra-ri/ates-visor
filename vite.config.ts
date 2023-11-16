import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// eslint-disable-next-line import/no-unresolved
import vueI18n from '@intlify/unplugin-vue-i18n/vite';
import yaml from '@modyfi/vite-plugin-yaml';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ script: { defineModel: true } }),
    yaml(),
    vueI18n({ include: path.resolve(__dirname, './src/locales/**') }),
  ],
  resolve: {
    alias: [
      { find: '/@', replacement: path.resolve(__dirname, './src') },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/layout.scss";
        `,
      },
    },
    postcss: { plugins: [autoprefixer] },
  },
});
