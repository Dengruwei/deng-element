const _setHeightZero = (el: HTMLElement) => {
  el.style.height = "0px";
};

const _setHeightScroll = (el: HTMLElement) => {
  el.style.height = `${el.scrollHeight}px`;
};

const _setHeightEmpty = (el: HTMLElement) => {
  el.style.height = "";
};

const _setOverflowHidden = (el: HTMLElement) => {
  el.style.overflow = "hidden";
};

const _setOverflowEmpty = (el: HTMLElement) => {
  el.style.overflow = "";
};

const transitionEvents = {
  beforeEnter(el: HTMLElement) {
    _setHeightZero(el);
    _setOverflowHidden(el);
  },
  enter(el: HTMLElement) {
    _setHeightScroll(el);
  },
  afterEnter(el: HTMLElement) {
    _setHeightEmpty(el);
    _setOverflowEmpty(el);
  },
  beforeLeave(el: HTMLElement) {
    _setHeightScroll(el);
    _setOverflowHidden(el);
  },
  leave: (el: HTMLElement) => {
    _setHeightZero(el);
  },
  afterLeave(el: HTMLElement) {
    _setHeightEmpty(el);
    _setOverflowEmpty(el);
  },
};

export default transitionEvents;
