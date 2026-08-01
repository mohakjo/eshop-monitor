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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="currentColor"
        class="size-4"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
      </svg>
    </button>

    <span class="text-gray text-lg">
      {{ value }}
    </span>

    <button
      class="blue-gradient flex h-7 w-6 cursor-pointer items-center justify-center rounded-r-full active:scale-95"
      @click="increment"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="currentColor"
        class="size-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  </div>
</template>
