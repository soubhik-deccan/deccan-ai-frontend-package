import { MouseEventHandler, ReactElement } from "react";

export type TPButtonVariant =
  | "danger"
  | "disable"
  | "secondary"
  | "primary"
  | "text"
  | "icon";

export type TPButtonIconPosition = "left" | "right";
export type TPButtonType = "button" | "reset" | "submit";
export type TPButtonSize = "xsm" | "sm" | "lg" | "md";
export type TPButtonGradient = "v1" | "v2";

export type TPButtonProps = {
  id?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: TPButtonVariant;
  icon?: ReactElement;
  iconPosition?: TPButtonIconPosition;
  disabled?: boolean;
  btnType?: TPButtonType;
  isLoading?: boolean;
  children?: React.ReactNode | string;
  size?: TPButtonSize;
  isOnlyIcon?: boolean;
  gradient?: TPButtonGradient;
};
