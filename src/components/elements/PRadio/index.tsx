import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/joy";
import React, { FC, useCallback } from "react";
import PMarkdownRenderer from "../PMarkDownRender";
import { TPRadioProps } from "./type";

const PRadio: FC<TPRadioProps> = ({
  options,
  name,
  label,
  value,
  customClassName = "",
  radioClassName = "",
  onChange,
  disabled = false,
}) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event);
    },
    [onChange]
  );

  const handleItemClick = useCallback(
    (optionValue: string) => {
      if (!disabled) {
        const syntheticEvent = {
          target: {
            value: optionValue,
            name,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        handleChange(syntheticEvent);
      }
    },
    [disabled, handleChange, name]
  );

  return (
    <FormControl
      className={`p-radio-container ${customClassName} ${
        disabled ? "read-only" : ""
      }`}
    >
      <FormLabel className="p-radio-label">
        <PMarkdownRenderer content={label} />
      </FormLabel>
      <RadioGroup
        className="p-radio-group"
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <label
            key={option.id}
            className="p-radio-item"
            onClick={() => handleItemClick(option.value)}
            style={{ cursor: disabled ? "not-allowed" : "pointer" }}
          >
            <div className="p-radio-icon">
              <Radio
                value={option.value}
                disabled={disabled}
                className={radioClassName}
                checked={value === option.value}
              />
            </div>
            <p className="p-radio-text">{option.displayLabel}</p>
          </label>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default PRadio;
