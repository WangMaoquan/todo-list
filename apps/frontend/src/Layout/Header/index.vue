<script setup lang="ts">
import { useGoto, openGithub } from '@/composables/goto';

const { gotoHome, gotoSettings } = useGoto();
</script>

<template>
  <div
    class="w-full base-color h-40px px-1% flex justify-between items-center text-16px"
  >
    <div class="cursor-pointer" aria-label="Go Home" @click="gotoHome()">
      TODO-LIST
    </div>
    <div class="flex items-center justify-start">
      <button class="mx-2 !outline-none" @click="gotoSettings()">
        <div i="carbon-settings" />
      </button>
      <button class="mx-2 !outline-none" @click="openGithub()">
        <div i="mdi-github" />
      </button>
    </div>
  </div>
</template>
