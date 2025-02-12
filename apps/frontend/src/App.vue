<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import { useRoute } from 'vue-router';
import Layout from './Layout/index.vue';
import { useThemeStore } from '@/store/useThemeStore';
import { useCommand } from '@/composables/command';

const route = useRoute();
const themeStore = useThemeStore();
const { initCommands } = useCommand();
initCommands();
</script>

<template>
  <NConfigProvider :theme="themeStore.naiveTheme">
    <Layout v-if="route.meta.layout !== false">
      <RouterView />
    </Layout>
    <RouterView v-else />
  </NConfigProvider>
</template>

<style scoped></style>
