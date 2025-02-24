import { InputProps } from "@mui/joy";
import { ReactElement } from "react";

export type TPInputProps = {
  placeholder: string;
  customClassName?: string;
  value: string;
  onChange?: (value: string) => void;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  numericOnly?: boolean;
  endDecorator?: ReactElement | null;
  startDecorator?: ReactElement | null;
  type?: InputProps["type"];
  color?: InputProps["color"];
  variant?: InputProps["variant"];
  disabled?: boolean;
  error?: boolean;
  startDecoratorProps?: object;
  maxLength?: number;
  allowUserToWriteOverMaxLimit?: boolean;
  shouldShowMaxLengthIndicator?: boolean;
};
