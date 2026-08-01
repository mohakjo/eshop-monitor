<script setup lang="ts">
const props = defineProps<{
  value: number;
}>();

const emit = defineEmits<{
  (e: "update:value", value: number): void;
}>();

function decrement() {
  if (props.value > 1) {
    emit("update:value", props.value - 1);
  }
}

function increment() {
  emit("update:value", props.value + 1);
}
</script>

<template>
  <div class="flex items-center gap-4 text-white">
    <button
      class="blue-gradient flex h-7 w-6 cursor-pointer items-center justify-center rounded-l-full active:scale-95"
      @click="decrement"
    >
      <IconMinus :stroke-width="2.5" class="size-4" />
    </button>

    <span class="text-gray text-lg">
      {{ value }}
    </span>

    <button
      class="blue-gradient flex h-7 w-6 cursor-pointer items-center justify-center rounded-r-full active:scale-95"
      @click="increment"
    >
      <IconPlus :stroke-width="2.5" class="size-4" />
    </button>
  </div>
</template>
