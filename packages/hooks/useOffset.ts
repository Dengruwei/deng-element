import { type Ref, computed } from "vue";

interface useOffsetOptions {
  offset: number;
  boxHeight: Ref<number>;
  getLastBottomOffset: () => number;
}

interface useOffsetResult {
  topOffset: Ref<number>;
  bottomOffset: Ref<number>;
}

export function useOffset(opts: useOffsetOptions): useOffsetResult {
  // 上一个实例的底部距离
  const lastBottomOffset = computed(() => opts.getLastBottomOffset());
  // 当前实例的顶部距离
  const topOffset = computed(() => lastBottomOffset.value + opts.offset);
  // 当前实例的底部距离
  const bottomOffset = computed(() => topOffset.value + opts.boxHeight.value);

  return {
    topOffset,
    bottomOffset,
  };
}

export default useOffset;
