export type TPHtmlTextInputProps = {
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
  type?: string;
  disabled?: boolean;
  error?: boolean;
};
