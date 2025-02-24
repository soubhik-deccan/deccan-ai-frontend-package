import { InputProps } from "@mui/joy";

export type TPTextAreaProps = {
  placeholder: string;
  customClassName?: string;
  value: string;
  onChange?: (value: string) => void;
  onClick?: () => void;
  onPaste?: (event: React.ClipboardEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onScroll?: () => void;
  minRows?: number;
  color?: InputProps["color"];
  disabled?: boolean;
  maxRows?: number;
  borderRadius?: number;
  isError?: boolean;
  spellCheck?: boolean;
  resize?: "none" | "both" | "horizontal" | "vertical";
  maxLength?: number;
  allowUserToWriteOverMaxLimit?: boolean;
  shouldShowMaxLengthIndicator?: boolean;
};
