<script setup lang="ts">
import type { DropdownItemProps } from "./types";
import { DROPDOWN_CTX_KEY } from "./constants";
import { computed, inject } from "vue";
import { useId } from "@toy-element/hooks";

defineOptions({
  name: "ErDropdownItem",
});

const props = withDefaults(defineProps<DropdownItemProps>(), {
  disabled: false,
  divided: false,
  command: useId().value,
});

const ctx = inject(DROPDOWN_CTX_KEY);

const size = computed(() => ctx?.size);

function handleClick() {
  if (props.disabled) return;
  ctx?.handleItemClick(props);
}
</script>

<template>
  <li v-if="divided" role="separator" class="divided-placeholder"></li>
  <li
    :id="`dropdown-item-${command ?? useId().value}`"
    :class="{
      'er-dropdown__item': true,
      ['er-dropdown__item--' + size]: size,
      'is-disabled': disabled,
      'is-divided': divided,
    }"
    @click="handleClick"
  >
    <slot></slot>
  </li>
</template>
