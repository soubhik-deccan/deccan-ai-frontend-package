export type TPCheckBoxProps = {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
  disabled?: boolean;
  checkboxClassName?: string;
};
