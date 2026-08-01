<script setup lang="ts">
/**
 * Champ de formulaire : libellé, saisie et message d'erreur.
 *
 * Deux habillages coexistaient dans les pages ; ils sont conservés à
 * l'identique via `variant` plutôt que d'être uniformisés, pour ne rien
 * changer au rendu existant.
 */
type FieldVariant = "default" | "compact";

withDefaults(
  defineProps<{
    label: string;
    id?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    variant?: FieldVariant;
  }>(),
  {
    type: "text",
    required: false,
    variant: "default",
  },
);

const model = defineModel<string>();

const LABEL_CLASSES: Record<FieldVariant, string | undefined> = {
  default: "text-sm font-semibold",
  compact: undefined,
};

const INPUT_CLASSES: Record<FieldVariant, string> = {
  default:
    "rounded border px-3 py-2 text-sm outline-none focus:border-blue-400",
  compact: "rounded border px-2 py-1",
};
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="id" :class="LABEL_CLASSES[variant]">{{ label }}</label>

    <input
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :class="INPUT_CLASSES[variant]"
    />

    <span v-if="error" class="text-xs text-red-500">{{ error }}</span>
  </div>
</template>
