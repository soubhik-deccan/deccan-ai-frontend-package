import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { TPHtmlTextInputProps } from "./type";

const PHtmlTextInput = forwardRef<HTMLInputElement, TPHtmlTextInputProps>(
  (
    {
      placeholder,
      customClassName = "",
      value,
      onChange,
      numericOnly = false,
      type = "text",
      disabled = false,
      error = false,
      onClick,
      onBlur,
      onFocus,
      onKeyDown,
      onKeyUp,
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
      ref,
      () =>
        ({
          focus: () => {
            internalRef.current?.focus();
          },
          blur: () => {
            internalRef.current?.blur();
          },
        } as HTMLInputElement),
      []
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      const sanitizedValue = numericOnly
        ? newValue.replace(/[^0-9]/g, "")
        : newValue;
      if (onChange) onChange(sanitizedValue);
    };

    return (
      <input
        ref={internalRef}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`p-html-text-input ${customClassName} ${
          error ? "error" : ""
        } ${disabled ? "disabled" : ""}`}
        disabled={disabled}
      />
    );
  }
);

PHtmlTextInput.displayName = "PHtmlTextInput";

export default PHtmlTextInput;
