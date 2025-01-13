import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';
import ContextMenu from '@imengyu/vue3-context-menu';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { setupRouter } from './router';
import '@unocss/reset/tailwind.css';
import 'uno.css';
import './style/overrides.css';

(async function setupApp() {
  const app = createApp(App).use(createPinia()).use(ContextMenu);
  await setupRouter(app);
  // This must be placed at bottom of app initialization, before mount.
  resolveNaiveAndTailwindConflict();
  app.mount('#app');
})();

// https://www.naiveui.com/zh-CN/os-theme/docs/style-conflict
function resolveNaiveAndTailwindConflict() {
  const meta = document.createElement('meta');
  meta.name = 'naive-ui-style';
  document.head.appendChild(meta);
}
