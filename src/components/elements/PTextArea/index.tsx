import { TextareaAutosize } from "@mui/material";
import React, { CSSProperties, useRef } from "react";
import { TPTextAreaProps } from "./type";

const PTextArea: React.FC<TPTextAreaProps> = ({
  placeholder,
  customClassName,
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
  resize = "none",
  maxLength = 0,
  allowUserToWriteOverMaxLimit = true,
  shouldShowMaxLengthIndicator = false,
}) => {
  const internalRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    // If allowUserToWriteOverMaxLimit is true, update value regardless of length
    // Otherwise, only update if within maxLength limit or if maxLength is not set
    if (
      allowUserToWriteOverMaxLimit ||
      !maxLength ||
      newValue.length <= maxLength
    ) {
      if (onChange) onChange(newValue);
    }
  };

  // Function to determine the resize style based on the prop
  const getResizeStyle = (resizeOption: string): string => {
    switch (resizeOption) {
      case "horizontal":
        return "horizontal";
      case "vertical":
        return "vertical";
      case "both":
        return "both";
      default:
        return "none";
    }
  };

  // Calculate if the text length has reached or exceeded the limit
  const isAtLimit = maxLength && value && value.length >= maxLength;

  // Character count display styles with dynamic color
  const getCharacterCountStyle = (): CSSProperties => ({
    position: "absolute",
    right: "8px",
    bottom: "8px",
    fontSize: "10px",
    color: isAtLimit ? "#2B3CA1" : "var(--neutrals-4, #666)",
    fontWeight: isAtLimit ? 500 : 400,
    transition: "color 0.2s ease-in-out",
  });

  // Constructing dynamic styles
  const dynamicStyles: CSSProperties = {
    borderRadius: `${borderRadius}px`,
    resize: getResizeStyle(resize) as
      | "none"
      | "both"
      | "horizontal"
      | "vertical",
    paddingBottom: maxLength ? "24px" : "8px",
  };

  return (
    <div
      className={`p-text-area-wrapper  ${
        shouldShowMaxLengthIndicator && maxLength ? "style-change" : ""
      }`}
    >
      <TextareaAutosize
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
        className={`p-text-area ${customClassName} ${isError ? "p-error" : ""}`}
        minRows={minRows}
        maxRows={maxRows}
        disabled={disabled}
        style={dynamicStyles}
        onClick={onClick}
        readOnly={disabled}
        maxLength={allowUserToWriteOverMaxLimit ? undefined : maxLength}
      />
      {shouldShowMaxLengthIndicator && (
        <div
          style={getCharacterCountStyle()}
          className="p-input-character-count"
        >
          {value?.length || 0}/{maxLength ?? "∞"}
        </div>
      )}
    </div>
  );
};

export default PTextArea;
