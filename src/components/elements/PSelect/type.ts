import { ActionMeta } from "react-select";

export type TPSelectOption = {
  value: string;
  label: string;
  fixed?: boolean;
};

export type TPSelectProps = {
  options: Array<TPSelectOption>;
  customClassName?: string;
  value: string | Array<string>;

  onChange: (
    value: string | Array<string> | null,
    actionMeta: ActionMeta<TPSelectOption>
  ) => void;
  onMenuOpen?: () => void;
  isDisabled?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  onInputChange?: (inputValue: string) => void;
  showOtherOptionWhenNoOptions?: boolean;
  error?: boolean;
  defaultInputValue?: string;
  defaultValue?: string | Array<string> | null | number;
  setSearchValue?: any;
  isLoading?: boolean;
};
