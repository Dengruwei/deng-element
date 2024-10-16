export type AlertType = "success" | "info" | "warning" | "error";

export interface AlertProps {
  title?: string;
  description?: string;
  type?: AlertType;
  closable?: boolean;
  effect?: "light" | "dark";
  center?: boolean;
  showIcon?: boolean;
}

export interface AlertEmits {
  (e: "close"): void;
}

export interface AlertInstance {
  open(): void;
  close(): void;
}
