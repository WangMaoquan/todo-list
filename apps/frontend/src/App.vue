<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import { useRoute } from 'vue-router';
import Layout from './Layout/index.vue';

const route = useRoute();
</script>

<template>
  <NConfigProvider>
    <Layout v-if="route.meta.layout !== false">
      <RouterView />
    </Layout>
    <RouterView v-else />
  </NConfigProvider>
</template>

<style scoped></style>
