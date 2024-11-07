import { useId, useZIndex } from "@toy-element/hooks";
import {
  notificationPosition,
  notificationTypes,
  type CreateNotificationProps,
  type NotificationFn,
  type NotificationHandler,
  type NotificationInstance,
  type NotificationParams,
  type NotificationProps,
  type notificationType,
} from "./types";
import { h, isVNode, render, shallowReactive } from "vue";
import { each, findIndex, get, isString, set } from "lodash-es";
import NotificationConstructor from "./Notification.vue";

const { nextZIndex } = useZIndex();

export const notificationDefaults = {
  type: "info",
  position: "top-right",
  duration: 3000,
  offset: 20,
  transitionName: "fade",
  showClose: true,
} as const;

const instanceMap: Map<NotificationProps["position"], NotificationInstance[]> =
  new Map();

each(notificationPosition, (key) => instanceMap.set(key, shallowReactive([])));

function normalizeOptions(
  options: NotificationParams
): CreateNotificationProps {
  const result =
    !options || isVNode(options) || isString(options)
      ? { message: options }
      : options;

  return { ...notificationDefaults, ...result } as CreateNotificationProps;
}

function createNotification(
  props: CreateNotificationProps
): NotificationInstance {
  const id = useId().value;
  const container = document.createElement("div");
  const instances = getInstancesByPosition(props.position || "top-right");
  const destroy = () => {
    const idx = findIndex(instances, { id });
    if (idx === -1) return;
    instances.splice(idx, 1);
    render(null, container);
  };

  const _props = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestroy: destroy,
  };

  const vnode = h(NotificationConstructor, _props);
  render(vnode, container);

  document.body.appendChild(container.firstElementChild!);

  const vm = vnode.component!;
  const handler: NotificationHandler = {
    close: () => vm.exposed?.close(),
  };

  const instance: NotificationInstance = {
    id,
    vm,
    vnode,
    props: _props,
    handler,
  };

  instances.push(instance);

  return instance;
}

export const notification: NotificationFn & Partial<Notification> = function (
  options = {}
) {
  const normalized = normalizeOptions(options);
  const instance = createNotification(normalized);
  return instance.handler;
};

const getInstancesByPosition = (position: NotificationProps["position"]) =>
  instanceMap.get(position) as NotificationInstance[];

export function getLastBottomOffset(this: NotificationProps) {
  const instances = getInstancesByPosition(this.position || "top-right");
  const idx = findIndex(instances, { id: this.id });
  if (idx <= 0) return 0;
  return get(instances, [idx - 1, "vm", "exposed", "bottomOffset", "value"]);
}

export function closeAll(type?: notificationType) {
  instanceMap.forEach((instances) => {
    each(instances, (instance) => {
      if (type) {
        instance.props.type === type && instance.handler.close();
        return;
      }
      instance.handler.close();
    });
  });
}

each(notificationTypes, (type) => {
  set(notification, type, (options: NotificationParams) => {
    const normalized = normalizeOptions(options);
    return notification({ ...normalized, type });
  });
});

notification.closeAll = closeAll;

export default notification as Notification;
