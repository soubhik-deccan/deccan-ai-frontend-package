import Input from "@mui/joy/Input";
import React, { CSSProperties, FC, useRef } from "react";
import { TPInputProps } from "./type";

const PInput: FC<TPInputProps> = ({
  placeholder,
  customClassName,
  value,
  onChange,
  endDecorator,
  startDecorator,
  numericOnly = false,
  type = "text",
  color = "neutral",
  variant = "soft",
  disabled = false,
  error = false,
  onClick,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  maxLength,
  allowUserToWriteOverMaxLimit = true,
  shouldShowMaxLengthIndicator = false,
}) => {
  const internalRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    // First handle numeric-only check
    const numericSanitizedValue = numericOnly
      ? newValue.replace(/[^0-9]/g, "")
      : newValue;

    // Then handle maxLength check if needed
    if (
      allowUserToWriteOverMaxLimit ||
      !maxLength ||
      numericSanitizedValue.length <= maxLength
    ) {
      if (onChange) onChange(numericSanitizedValue);
    }
  };

  // Calculate if the text length has reached or exceeded the limit
  const isAtLimit = maxLength && value && value.length >= maxLength;

  // Character count display styles
  const characterCountStyle: CSSProperties = {
    position: "absolute",
    right: "8px",
    bottom: "4px",
    fontSize: "10px",
    color: isAtLimit ? "#2B3CA1" : "var(--neutrals-4, #666)",
    fontWeight: isAtLimit ? 500 : 400,
    transition: "color 0.2s ease-in-out",
    pointerEvents: "none",
  };

  return (
    <div
      className={`p-input-wrapper ${
        shouldShowMaxLengthIndicator && maxLength ? "style-change" : ""
      }`}
    >
      <Input
        ref={internalRef}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        onBlur={onBlur}
        type={type}
        startDecorator={startDecorator}
        endDecorator={endDecorator}
        placeholder={placeholder}
        variant={variant}
        error={error}
        value={value}
        onChange={handleChange}
        className={`p-input ${customClassName} ${error ? "p-error" : ""} ${
          disabled ? "p-disabled" : ""
        }`}
        disabled={disabled}
        sx={{
          "&::before": {
            display: "none",
          },
          "&::after": {
            display: "none",
          },
          // Remove the padding-right since counter is now at bottom
          width: "100%",
        }}
        color={color}
      />
      {shouldShowMaxLengthIndicator && (
        <div
          style={characterCountStyle}
          className="p-text-input-character-count"
        >
          {value?.length || 0}/{maxLength ?? "∞"}
        </div>
      )}
    </div>
  );
};

export default PInput;
