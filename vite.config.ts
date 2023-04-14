import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import yaml from '@modyfi/vite-plugin-yaml';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    yaml(),
    vueI18n({ include: path.resolve(__dirname, './src/locales/**') }),
  ],
  resolve: {
    alias: [
      { find: '/@', replacement: path.resolve(__dirname, './src') },
    ],
  },
  css: { postcss: { plugins: [autoprefixer] } },
});
