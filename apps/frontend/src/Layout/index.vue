<script setup lang="ts">
import TheHeader from './Header/index.vue';
import Navbar from './Navbar/index.vue';
</script>

<template>
  <div>
    <TheHeader />
    <div class="flex">
      <Navbar />
      <div class="grow">
        <slot />
      </div>
    </div>
  </div>
</template>
