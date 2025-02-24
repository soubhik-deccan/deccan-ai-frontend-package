// @ts-nocheck
import MarkdownIt from "markdown-it";
import markdownItMathjax3 from "markdown-it-mathjax3";
import React, { memo, useEffect, useRef } from "react";
import {
  default as Editor,
  default as MdEditor,
  Plugins,
} from "react-markdown-editor-lite";
import { EditorConfig } from "react-markdown-editor-lite/cjs/share/var";
import "react-markdown-editor-lite/lib/index.css";

export type TCustomMarkdownEditorProps = {
  placeholder: string;
  customClassName?: string;
  value: string;
  onChange?: (value: string | undefined) => void;
  onClick?: () => void;
  onPaste?: (
    event: React.ClipboardEvent<
      HTMLDivElement | HTMLTextAreaElement
    >
  ) => void;
  onKeyDown?: (
    event: React.KeyboardEvent<
      HTMLDivElement | HTMLTextAreaElement
    >
  ) => void;
  onKeyUp?: (
    event: React.KeyboardEvent<
      HTMLDivElement | HTMLTextAreaElement
    >
  ) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onScroll?: () => void;
  disabled?: boolean;
  isError?: boolean;
  spellCheck?: boolean;
  height?: number;
};

// 1. Dynamically load MathJax
const loadMathJax = () => {
  if ((window as any).MathJax) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-mml-chtml.js";
    script.async = true;
    script.onload = resolve;
    document.head.appendChild(script);

    const config = document.createElement("script");
    config.type = "text/javascript";
    config.text = `
      window.MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
          displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
          processEscapes: true
		  processEnvironments: true,
        },
        options: {
          skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
        }
      };
    `;
    document.head.appendChild(config);
  });
};

// 2. Default configuration for Editor
const defaultConfig: EditorConfig = {
  theme: "default",
  view: {
    menu: true,
    md: true,
    html: true,
  },
  canView: {
    menu: true,
    md: true,
    html: true,
    both: true,
    fullScreen: true,
    hideMenu: true,
  },
  htmlClass: "",
  markdownClass: "",
  syncScrollMode: ["rightFollowLeft", "leftFollowRight"],
  imageUrl: "",
  imageAccept: "",
  linkUrl: "",
  loggerMaxSize: 100,
  loggerInterval: 600,
  table: {
    maxRow: 4,
    maxCol: 6,
  },
  allowPasteImage: true,
  onImageUpload: undefined,
  onCustomImageUpload: undefined,
  shortcuts: true,
  onChangeTrigger: "both",
};

// 3. Create MarkdownIt instance with MathJax 3 plugin
const mdParser = new MarkdownIt({
  // Enable whatever features you want here:
  html: true,
  linkify: true,
  typographer: true,
}).use(markdownItMathjax3);

// 4. Optionally use any React-Markdown-Editor-Lite plugins you want
Editor.use(Plugins.TabInsert, {
  tabMapValue: 1,
});

const CustomMarkdownEditor: React.FC<TCustomMarkdownEditorProps> =
  memo(
    ({
      placeholder,
      customClassName = "",
      value,
      onChange,
      disabled = false,
      isError = false,
      onClick,
      onFocus,
      onBlur,
      onScroll,
      height = 450,
    }) => {
      const renderTimeoutRef = useRef<NodeJS.Timeout>();

      useEffect(() => {
        // Initialize MathJax on mount
        const initMathJax = async () => {
          try {
            await loadMathJax();
          } catch (error) {
            console.error("Failed to load MathJax:", error);
          }
        };

        initMathJax();

        // Cleanup any pending timers
        return () => {
          if (renderTimeoutRef.current) {
            clearTimeout(renderTimeoutRef.current);
          }
        };
      }, []);

      useEffect(() => {
        // Re-run MathJax after each new render
        if (renderTimeoutRef.current) {
          clearTimeout(renderTimeoutRef.current);
        }

        renderTimeoutRef.current = setTimeout(async () => {
          try {
            const MathJax = (window as any).MathJax;
            if (MathJax?.typesetPromise) {
              await MathJax.typesetPromise();
            }
          } catch (error) {
            console.error(
              "MathJax rendering error:",
              error
            );
          }
        }, 100);
      }, [value]);

      // 5. Handle text changes in the editor
      const handleEditorChange = ({
        text,
      }: {
        text: string;
        html: string;
      }): void => {
        if (onChange) {
          onChange(text);
        }
      };

      // 6. Render HTML from Markdown text
      const renderHTML = (text: string): string => {
        try {
          return mdParser.render(text);
        } catch (error) {
          console.error("Markdown rendering error:", error);
          return '<div class="error">Error rendering content</div>';
        }
      };

      return (
        <div
          onClick={onClick}
          className={`p-markdown-editor-container ${customClassName} ${isError ? "error" : ""
            }`}
        >
          <MdEditor
            value={value}
            style={{ height: `${height}px` }}
            renderHTML={renderHTML}
            onChange={handleEditorChange}
            readOnly={disabled}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            onScroll={onScroll}
            autoFocus={true}
            view={{
              menu: disabled ? false : true,
              md: true,
              html: true,
            }}
            config={defaultConfig}
            htmlClass="p-markdown-editor-html"
          />
        </div>
      );
    },
    (prevProps, nextProps) => {
      return prevProps.value === nextProps.value;
    }
  );

export default CustomMarkdownEditor;
