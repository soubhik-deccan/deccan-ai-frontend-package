import React, { useCallback, useEffect, useRef, useState } from "react";
import { TPAccordionProps } from "./type";

const Accordion: React.FC<TPAccordionProps> = ({
  title,
  children,
  isOpen: parentIsOpen,
  onToggle,
  className = "",
  headerClassName = "",
  contentClassName = "",
  titleClassName = "",
  iconClassName = "",
  style,
  contentStyle,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(parentIsOpen || false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const updateContentHeight = useCallback(() => {
    if (contentWrapperRef.current) {
      const height = contentWrapperRef.current.scrollHeight;
      setContentHeight(height);
    }
  }, []);

  useEffect(() => {
    if (typeof parentIsOpen !== "undefined" && parentIsOpen !== isOpen) {
      setIsOpen(parentIsOpen);
    }
  }, [parentIsOpen]);

  useEffect(() => {
    if (isInitialMount.current) {
      updateContentHeight();
      isInitialMount.current = false;
    }

    const resizeObserver = new ResizeObserver(() => {
      if (isOpen) {
        updateContentHeight();
      }
    });

    if (contentWrapperRef.current) {
      resizeObserver.observe(contentWrapperRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [isOpen, updateContentHeight]);

  useEffect(() => {
    updateContentHeight();
  }, [children, updateContentHeight]);

  const handleToggle = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (disabled) return;

      const newState = !isOpen;
      setIsOpen(newState);
      onToggle?.(newState);

      requestAnimationFrame(() => {
        updateContentHeight();
      });
    },
    [isOpen, onToggle, disabled, updateContentHeight]
  );

  return (
    <div
      className={`p-accordion ${className}`}
      style={style}
      data-state={isOpen ? "open" : "closed"}
    >
      <button
        className={`p-accordion__header ${headerClassName}`}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="accordion-content"
        disabled={disabled}
        type="button"
      >
        <span className={`p-accordion__title ${titleClassName}`}>{title}</span>
        <span
          className={`p-accordion__icon ${
            !isOpen ? "p-accordion__icon--open" : ""
          } ${iconClassName}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </span>
      </button>
      <div
        id="accordion-content"
        ref={contentRef}
        className={`p-accordion__content ${
          isOpen ? "p-accordion__content--open" : ""
        } ${contentClassName}`}
        style={{
          ...contentStyle,
          maxHeight: isOpen ? `${contentHeight}px` : "0",
        }}
      >
        <div ref={contentWrapperRef} className="p-accordion__body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
