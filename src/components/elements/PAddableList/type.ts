export type TPAddableListProps = {
  placeholder?: string;
  onItemsChange: (items: string[]) => void;
  value?: string[];
  hideInput?: boolean;
  isError?: boolean;
  inputValidation?: string;
  reRender?: boolean;
  renderType?: "input|textarea";
  disabled?: boolean;
};
