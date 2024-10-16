<script setup lang="ts">
import type { CollapseProps, CollapseEmit, CollapseItemName } from "./types";
import { COLLAPSE_CTX_KEY } from "./contants";
import { provide, ref, watch, watchEffect } from "vue";
import { debugWarn } from "@toy-element/utils";

const COMP_NAME = "ErCollapse" as const;

defineOptions({
  name: COMP_NAME,
});

const props = defineProps<CollapseProps>();
const emit = defineEmits<CollapseEmit>();
const activeNames = ref(props.modelValue);

if (props.accordion && activeNames.value.length > 1) {
  console.warn("Accordion mode only allows one active panel");
}

function handleItemClick(item: CollapseItemName) {
  let _activeNames = [...activeNames.value];
  if (props.accordion) {
    _activeNames = _activeNames.includes(item) ? [] : [item];
    updateActiveNames(_activeNames);
    return;
  }

  const index = _activeNames.indexOf(item);
  if (index > -1) {
    _activeNames.splice(index, 1);
  } else {
    _activeNames.push(item);
  }
  updateActiveNames(_activeNames);
}

function updateActiveNames(newNames: CollapseItemName[]) {
  activeNames.value = newNames;
  emit("update:modelValue", newNames);
  emit("change", newNames);
}

watchEffect(() => {
  if (props.accordion && activeNames.value.length > 1) {
    debugWarn(COMP_NAME, "Accordion mode only allows one active panel");
  }
});

watch(
  () => props.modelValue,
  (newNames) => {
    updateActiveNames(newNames);
  }
);

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick,
});
</script>

<template>
  <div class="er-collapse">
    <slot></slot>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
