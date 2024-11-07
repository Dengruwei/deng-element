<script setup lang="ts">
import { computed, ref, provide } from "vue";
import { isNil, omit } from "lodash-es";
import { DROPDOWN_CTX_KEY } from "./constants";
import type {
  DropdownProps,
  DropdownItemProps,
  DropdownInstance,
  DropdownEmits,
  DropdownContext,
} from "./types";
import type { TooltipInstance } from "../Tooltip/types";
import { type ButtonInstance, ErButton, ErButtonGroup } from "../Button";
import { useDisabledStyle, useId } from "@toy-element/hooks";

import DropdownItem from "./DropdownItem.vue";
import Tooltip from "../Tooltip/Tooltip.vue";

defineOptions({
  name: "ErDropdown",
  inheritAttrs: false,
});
const props = withDefaults(defineProps<DropdownProps>(), {
  hideOnClick: true,
  items: () => [] as DropdownItemProps[],
});

const emit = defineEmits<DropdownEmits>();
const slots = defineSlots();

const tooltipRef = ref<TooltipInstance>();
const triggerRef = ref<ButtonInstance>();

const toolTipProps = computed(() =>
  omit(props, ["items", "hideOnClick", "size", "type", "splitButton"])
);

function handleItemClick(e: DropdownItemProps) {
  props.hideOnClick && tooltipRef.value?.hide();
  !isNil(e.command) && emit("command", e.command);
}

!TEST && useDisabledStyle();

defineExpose<DropdownInstance>({
  open: () => tooltipRef.value?.show(),
  close: () => tooltipRef.value?.hide(),
});

provide<DropdownContext>(DROPDOWN_CTX_KEY, {
  handleItemClick,
  size: computed(() => props.size),
});
</script>

<template>
  <div
    class="er-dropdown"
    :id="`dropdown-${useId().value}`"
    :class="{ 'is-disabled': props.disabled }"
  >
    <tooltip
      ref="tooltipRef"
      v-bind="toolTipProps"
      :virtual-triggering="splitButton"
      :virtual-ref="triggerRef"
      @visible-change="$emit('visible-change', $event)"
    >
      <er-button-group
        :type="type"
        :size="size"
        :disabled="disabled"
        v-if="splitButton"
      >
        <er-button @click="$emit('click', $event)">
          <slot name="default"></slot>
        </er-button>
        <er-button ref="triggerRef" icon="angle-down"></er-button>
      </er-button-group>
      <slot v-else name="default"></slot>

      <template #content>
        <ul class="er-dropdown__menu">
          <slot name="dropdown">
            <template v-for="item in items" :key="useId().value">
              <dropdown-item v-bind="item" />
            </template>
          </slot>
        </ul>
      </template>
    </tooltip>
  </div>
</template>

<style scoped>
@import "./style.css";
:deep(.er-button-group) {
  & > :last-child {
    padding: 5px 7px;
  }
}
</style>
