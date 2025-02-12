<script setup lang="ts">
import { NModal } from 'naive-ui';
import { watch } from 'vue';
import { useSearch, useCommandModal } from '@/composables/command';
import CommandBody from './CommandModalBody.vue';

const { resetSearch } = useSearch();
const { registerKeyboardShortcut, showCommandModal } = useCommandModal();

registerKeyboardShortcut();

watch(
  () => showCommandModal.value,
  (v) => {
    if (!v) resetSearch();
  },
);
</script>

<template>
  <NModal v-model:show="showCommandModal" display-directive="show">
    <CommandBody />
  </NModal>
</template>

<style scoped></style>
