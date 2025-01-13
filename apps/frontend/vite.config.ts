import path from 'node:path';
import { defineConfig, ViteUserConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from 'unocss/vite';

const plugins = [vueJsx(), vue(), Unocss()] as ViteUserConfig['plugins'];

export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: path.resolve(__dirname, './vitest.setup.ts'),
  },
  plugins,
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      'services/': `${path.resolve(__dirname, 'src/services')}/`,
    },
  },
});
