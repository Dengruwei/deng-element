import type { InjectionKey } from "vue";
import type { ButtonGroupContent } from "./types";

export const BUTTON_GROUP_CTX_KEY: InjectionKey<ButtonGroupContent> = Symbol(
  "BUTTON_GROUP_CTX_KEY"
);
