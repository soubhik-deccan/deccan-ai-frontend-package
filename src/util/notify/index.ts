/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type TToastPosition =
  | "top-right"
  | "top-center"
  | "top-left"
  | "bottom-right"
  | "bottom-center"
  | "bottom-left";
type TToastTheme = "light" | "dark";

type TNotifyOptions = {
  position?: TToastPosition;
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: undefined;
  theme?: TToastTheme;
  className?: string;
  bodyClassName?: string;
};

const notify = (
  msg: string,
  type: "success" | "error" | "warning" | "info",
  options?: TNotifyOptions
) => {
  toast[type](msg, {
    position: options?.position ?? "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: options?.theme ?? "colored",
  });
};

export function notifySuccess(msg: string, options?: TNotifyOptions) {
  notify(msg, "success", options);
}

export function notifyError(msg: string, options?: TNotifyOptions) {
  notify(msg, "error", options);
}

export function notifyWarning(msg: string, options?: TNotifyOptions) {
  notify(msg, "warning", options);
}

export function notifyInfo(msg: string, options?: TNotifyOptions) {
  notify(msg, "info", options);
}

export function notifyGeneralMsg(
  msg: string,
  options?: TNotifyOptions,
  className?: string,
  bodyClassName?: string
) {
  toast(msg || "Copied!", {
    className: "custom-toast",
    bodyClassName: "custom-toast-body",
    ...options,
    ...(className && { className }),
    ...(bodyClassName && { bodyClassName }),
  });
}
