import path from 'node:path';
import { defineConfig, ViteUserConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from 'unocss/vite';
import { loadEnv } from 'vite';

const plugins = [vueJsx(), vue(), Unocss()] as ViteUserConfig['plugins'];

export default defineConfig(({ mode }) => {
  const config = loadEnv(mode, './');

  return {
    test: {
      environment: 'happy-dom',
      setupFiles: path.resolve(__dirname, './vitest.setup.ts'),
    },
    server: {
      proxy: {
        '/api': {
          target: config.VITE_API_LINK,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins,
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
  };
});
