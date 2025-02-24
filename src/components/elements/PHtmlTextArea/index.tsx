import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { TPHtmlTextAreaProps } from "./type";

const PHtmlTextArea = forwardRef<HTMLTextAreaElement, TPHtmlTextAreaProps>(
  (
    {
      placeholder,
      customClassName = "",
      value,
      onChange,
      onPaste,
      onKeyDown,
      onKeyUp,
      onFocus,
      onBlur,
      onScroll,
      minRows = 3,
      disabled = false,
      maxRows,
      borderRadius,
      isError = false,
      onClick,
      spellCheck = true,
    },
    ref
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(
      ref,
      (): any => {
        return {
          focus: () => {
            if (internalRef.current) {
              internalRef.current.focus();
            }
          },
        };
      },
      []
    );

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(event.target.value);
    };

    return (
      <textarea
        ref={internalRef}
        spellCheck={spellCheck}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onPaste={onPaste}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        onBlur={onBlur}
        onScroll={onScroll}
        className={`p-html-text-area ${customClassName} ${
          isError ? "error" : ""
        }`}
        rows={minRows}
        disabled={disabled}
        style={{ borderRadius: borderRadius ? `${borderRadius}px` : undefined }}
        onClick={onClick}
      />
    );
  }
);

PHtmlTextArea.displayName = "PHtmlTextArea";

export default PHtmlTextArea;
