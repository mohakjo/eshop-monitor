<script setup lang="ts">
defineProps<{
  category: string;
}>();
</script>

<template>
  <button
    class="font-commissioner blue-gradient h-fit cursor-pointer rounded-full px-2 text-xs text-white capitalize sm:text-sm"
  >
    {{ category }}
  </button>
</template>

<style></style>
