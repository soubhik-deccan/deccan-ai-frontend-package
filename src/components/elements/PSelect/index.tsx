import { debounce } from "lodash";
import { FC, useState } from "react";
import Select, {
  type ActionMeta,
  type MultiValue,
  type SingleValue,
} from "react-select";
import { TPSelectOption, TPSelectProps } from "./type";

const PSelect: FC<TPSelectProps> = ({
  options,
  value,
  customClassName,
  onChange,
  onMenuOpen,
  placeholder = "Select",
  isDisabled = false,
  isClearable = false,
  isSearchable = true,
  isMulti = false,
  showOtherOptionWhenNoOptions = false,
  error,
  defaultInputValue,
  defaultValue,
  setSearchValue,
  isLoading = false,
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const getValue = () => {
    if (isMulti && Array.isArray(value)) {
      return options.filter((option) => value.includes(option.value));
    } else if (!isMulti) {
      return options.find((option) => option.value === value) || null;
    }
    return null;
  };

  const handleSelectChange = (
    selectedOption: SingleValue<TPSelectOption> | MultiValue<TPSelectOption>,
    actionMeta: ActionMeta<TPSelectOption>
  ) => {
    if (isMulti) {
      const values = (selectedOption as MultiValue<TPSelectOption>).map(
        (option) => option.value
      );
      onChange(values, actionMeta);
    } else {
      const value = selectedOption
        ? (selectedOption as TPSelectOption).value
        : null;
      onChange(value, actionMeta);
    }
  };

  const handleInputChange = debounce((value, reason) => {
    if (reason.action === "input-change") {
      setSearchValue(value);
    }
  }, 1000);

  const customFilter = (option: any, rawInput: string) => {
    const inputValue = rawInput.toLowerCase();
    // If there's no input, include all options
    if (!inputValue) {
      return true;
    }
    // Allow the first and last options to always be visible
    if (option.data.fixed) {
      return true;
    }

    // Apply regular filtering for other options
    return (
      option.label.toLowerCase().includes(inputValue) ||
      option.value.toLowerCase().includes(inputValue)
    );
  };
  const tempDefaultValue = { value: "", label: "" };

  return (
    <Select
      options={options}
      value={getValue()}
      className={`p-select-wrapper ${customClassName} ${error ? "error" : ""}`}
      classNamePrefix="react-select"
      onChange={handleSelectChange}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isMulti={isMulti}
      onMenuOpen={onMenuOpen && onMenuOpen}
      // components={{ ValueContainer: CustomValueContainer }}
      onInputChange={setSearchValue && handleInputChange}
      defaultInputValue={defaultInputValue}
      defaultValue={tempDefaultValue}
      filterOption={showOtherOptionWhenNoOptions ? customFilter : undefined}
      isLoading={isLoading}
    />
  );
};

export default PSelect;
