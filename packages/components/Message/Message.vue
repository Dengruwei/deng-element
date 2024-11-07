<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { MessageProps } from "./types";
import { typeIconMap, RenderVnode } from "@toy-element/utils";
import { bind, delay } from "lodash-es";
import { useEventListener, useOffset } from "@toy-element/hooks";
import { getLastBottomOffset } from "./methods";
import ErIcon from "../Icon/Icon.vue";
defineOptions({
  name: "ErMessage",
});

const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
  offset: 10,
  transitionName: "fade-up",
});

const visible = ref(false);
const messageRef = ref<HTMLDivElement>();

const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");

const boxHeight = ref(0);

const { topOffset, bottomOffset } = useOffset({
  getLastBottomOffset: bind(getLastBottomOffset, props),
  offset: props.offset,
  boxHeight,
});

const cssStyle = computed(() => ({
  top: topOffset.value + "px",
  zIndex: props.zIndex,
}));

let timer: number; // 计时器
function startTimmer() {
  if (props.duration === 0) return;
  timer = delay(close, props.duration);
}

function clearTimer() {
  clearTimeout(timer);
}

function close() {
  visible.value = false;
}

onMounted(() => {
  visible.value = true;
  startTimmer();
});

useEventListener(document, "keydown", (e: Event) => {
  const { code } = e as KeyboardEvent;
  if (code === "Escape") {
    close();
  }
});

watch(visible, (val) => {
  if (!val) boxHeight.value = -props.offset;
});

defineExpose({
  bottomOffset,
  close,
});
</script>

<template>
  <Transition
    :name="transitionName"
    @enter="boxHeight = messageRef!.getBoundingClientRect().height"
    @after-leave="!visible && onDestory()"
  >
    <div
      ref="messageRef"
      class="er-message"
      :class="{
        [`er-message--${type}`]: type,
        'is-close': showClose,
        'text-center': center,
      }"
      :style="cssStyle"
      v-show="visible"
      role="alert"
      @mouseenter="clearTimer"
      @mouseout="startTimmer"
    >
      <er-icon class="er-message__icon" :icon="iconName" />
      <div class="er-message__content">
        <slot>
          <render-vnode v-if="message" :vNode="message"></render-vnode>
        </slot>
      </div>
      <div class="er-message__close" v-if="showClose">
        <er-icon icon="xmark" @click.stop="close" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@import "./style.css";
</style>
