import { describe, it, expect, vi, beforeEach, test } from "vitest";
import { mount } from "@vue/test-utils";
import type { PopconfirmProps } from "./types";
import { withInstall } from "@toy-element/utils";
import Popconfirm from "./Popconfirm.vue";
import { ErPopconfirm } from ".";
import { each, get } from "lodash-es";

const onConfirm = vi.fn();
const onCancel = vi.fn();

describe("Popconfirm/index.ts", () => {
  it("should be exported with withInstance", () => {
    expect(ErPopconfirm.install).toBeDefined();
  });

  it("should be export Popconfirm component", () => {
    expect(ErPopconfirm).toBe(Popconfirm);
  });

  test("should enhance Popconfirm component", () => {
    const enhancedPopconfirm = withInstall(Popconfirm);
    expect(enhancedPopconfirm).toBe(ErPopconfirm);
  });

  test("should apply specific enhancement", () => {
    const enhancedPopconfirm = withInstall(Popconfirm);
    expect(enhancedPopconfirm).toHaveProperty("install");
  });
});

describe("Popconfirm.vue", () => {
  const props = {
    title: "Test Title",
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    confirmButtonType: "primary",
    cancelButtonType: "info",
    icon: "check-circle",
    iconColor: "green",
    hideIcon: false,
    hideAfter: 500,
    width: 200,
  } as PopconfirmProps;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  it("should accept all props", () => {
    const wrapper = mount(Popconfirm, {
      props: props,
    });

    each(Object.keys(props), (key) => {
      expect(get(wrapper.props(), key)).toBe(get(props, key));
    });
  });

  it("should renders slot content correctly", () => {
    const slotContent = "Slot Content";
    const wrapper = mount(Popconfirm, {
      props,
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.text()).toContain(slotContent);
  });

  test("popconfirm emits", async () => {
    const wrapper = mount(() => (
      <div>
        <div id="outside"></div>
        <Popconfirm
          title="Test Title"
          hideIcon={true}
          onConfirm={onConfirm}
          onCancel={onCancel}
        >
          <button id="trigger">trigger</button>
        </Popconfirm>
      </div>
    ));
    const triggerArea = wrapper.find("#trigger");
    expect(triggerArea.exists()).toBeTruthy();

    triggerArea.trigger("click");
    await vi.runAllTimers();

    // 弹出层是否出现
    expect(wrapper.find(".er-popconfirm").exists()).toBeTruthy();
    const confirmButton = wrapper.find(".er-popconfirm__confirm");
    expect(confirmButton.exists()).toBeTruthy();

    confirmButton.trigger("click");
    await vi.runAllTimers();
    expect(wrapper.find(".er-popconfirm").exists()).toBeFalsy();
    expect(onConfirm).toBeCalled();

    triggerArea.trigger("click");
    await vi.runAllTimers();
    expect(wrapper.find(".er-popconfirm").exists()).toBeTruthy();
    const cancelButton = wrapper.find(".er-popconfirm__cancel");
    expect(cancelButton.exists()).toBeTruthy();

    await vi.runAllTimers();
    cancelButton.trigger("click");
    await vi.runAllTimers();
    expect(wrapper.find(".er-popconfirm").exists()).toBeFalsy();
    expect(onCancel).toBeCalled();
  });
});
