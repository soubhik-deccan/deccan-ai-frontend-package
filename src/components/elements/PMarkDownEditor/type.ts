export type TPMarkDownEditorProps = {
  placeholder: string;
  customClassName?: string;
  value: string;
  onChange?: (value: string | undefined) => void;
  onClick?: () => void;
  onPaste?: (
    event: React.ClipboardEvent<HTMLDivElement | HTMLTextAreaElement>
  ) => void;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLDivElement | HTMLTextAreaElement>
  ) => void;
  onKeyUp?: (
    event: React.KeyboardEvent<HTMLDivElement | HTMLTextAreaElement>
  ) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onScroll?: () => void;
  disabled?: boolean;
  isError?: boolean;
  spellCheck?: boolean;
  height?: number;
};
