import { Extension } from "@tiptap/core";
import _ from "lodash";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import tippy, { Props, Instance as TippyInstance } from "tippy.js";

interface GrammarError {
  startIndex: number;
  endIndex: number;
  suggestions: string[];
  id: string;
  ignored?: boolean;
}

interface GrammarCheckOptions {
  debounceTime: number;
  grammerService: (value: string) => Promise<any>;
  showSuggestions?: (
    context: any,
    element: HTMLElement,
    error: GrammarError
  ) => void;
  hideSuggestions?: (context: any) => void;
  applySuggestion?: (
    context: any,
    error: GrammarError,
    suggestion: string
  ) => void;
  checkGrammar?: (context: any) => void;
  clearHideTimeout?: (context: any) => void;
  setHideTimeout?: (context: any) => void;
  updateDecorations?: (context: any) => void;
  ignoreError?: (context: any, errorId: string) => void;
  handleDocumentChange?: (context: any, view: any) => void;
}

export const GrammarCheck = Extension.create<GrammarCheckOptions>({
  name: "grammarCheck",

  addOptions() {
    return {
      debounceTime: 500,
      // @ts-ignore
      grammerService: (value: string) => {
        return Promise.resolve([]);
      },
    };
  },

  addStorage() {
    return {
      decorations: DecorationSet.empty,
      errors: [] as GrammarError[],
      tippyInstance: null as TippyInstance | null,
      debouncedCheckGrammar: null as ((context: any) => void) | null,
      activeError: null as GrammarError | null,
      hideTimeout: null as NodeJS.Timeout | null,
      ignoredErrors: new Set<string>(),
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("grammarCheck"),
        props: {
          // @ts-ignore
          decorations: (state) => this.storage.decorations,
          handleDOMEvents: {
            // @ts-ignore
            mouseover: (view, event) => {
              const target = event.target as HTMLElement;
              if (target.classList.contains("grammar-error")) {
                if (this.options.clearHideTimeout) {
                  this.options.clearHideTimeout(this);
                }
                const errorId = target.getAttribute("data-error-id");
                const error = this.storage.errors.find(
                  (err: any) => err.id === errorId
                );
                if (error && this.options.showSuggestions) {
                  this.storage.activeError = error;
                  this.options.showSuggestions(this, target, error);
                }
              }
              return false;
            },
            // @ts-ignore
            mouseout: (view, event) => {
              const relatedTarget = event.relatedTarget as HTMLElement;
              if (!relatedTarget || !relatedTarget.closest(".tippy-box")) {
                if (this.options.setHideTimeout) {
                  this.options.setHideTimeout(this);
                }
              }
              return false;
            },
          },
        },
        view: () => ({
          update: (view, prevState) => {
            const { state } = view;
            if (state.doc !== prevState.doc) {
              if (this.options.handleDocumentChange) {
                this.options.handleDocumentChange(this, view);
              }
            }
          },
        }),
      }),
    ];
  },

  // onUpdate() {
  // 	if (this.storage.debouncedCheckGrammar) {
  // 		this.storage.debouncedCheckGrammar(this);
  // 	}
  // },

  onCreate() {
    // @ts-ignore
    this.options.showSuggestions = (context, element, error) => {
      if (context.storage.tippyInstance) {
        context.storage.tippyInstance.destroy();
      }

      const content = document.createElement("div");
      content.className = "grammar-suggestions";

      const topdiv = document.createElement("div");
      topdiv.className = "title";
      topdiv.textContent = "Grammar Check";
      content.appendChild(topdiv);

      const middiv = document.createElement("div");
      middiv.className = "mid-div";

      content.appendChild(middiv);

      error.suggestions.forEach((suggestion) => {
        const button = document.createElement("div");
        button.className = "t-sm suggestion";
        button.textContent = suggestion;
        button.onclick = () => {
          if (context.options.applySuggestion) {
            context.options.applySuggestion(context, error, suggestion);
          }
        };
        middiv.appendChild(button);
      });

      // Add ignore button
      const ignoreButton = document.createElement("button");
      ignoreButton.className = "ignore-error";
      ignoreButton.innerHTML = `
    
    Ignore
  `;
      ignoreButton.onclick = () => {
        if (context.options.ignoreError) {
          context.options.ignoreError(context, error.id);
        }
      };
      middiv.appendChild(ignoreButton);

      const { view } = context.editor;
      // @ts-ignore
      const { top, left, bottom } = view.coordsAtPos(error.startIndex);

      const tippyOptions: Partial<Props> = {
        content,
        interactive: true,
        trigger: "manual",
        placement: "bottom",
        theme: "light-border",
        getReferenceClientRect: () => ({
          width: 0,
          height: 0,
          top: bottom - 10,
          left,
          right: left,
          bottom,
          x: left + 50,
          y: bottom - 10,
          toJSON: () => null,
        }),
        onShow: (instance) => {
          instance.popper.addEventListener("mouseenter", () =>
            context.options.clearHideTimeout?.(context)
          );
          instance.popper.addEventListener("mouseleave", () =>
            context.options.setHideTimeout?.(context)
          );
        },
        onHide: () => {
          context.storage.activeError = null;
        },
      };

      context.storage.tippyInstance = tippy(document.body, tippyOptions);
      context.storage.tippyInstance.show();
    };

    this.options.hideSuggestions = (context) => {
      if (context.storage.tippyInstance) {
        context.storage.tippyInstance.hide();
      }
    };

    this.options.applySuggestion = (context, error, suggestion) => {
      const { startIndex, endIndex } = error;
      const originalText = context.editor.state.doc.textBetween(
        startIndex,
        endIndex
      );

      const lengthDifference = suggestion.length - originalText.length;

      context.editor
        .chain()
        .focus()
        .insertContentAt({ from: startIndex, to: endIndex }, suggestion)
        .run();

      context.storage.errors = context.storage.errors.filter(
        (err: any) => err.id !== error.id
      );

      context.storage.errors = context.storage.errors.map((err: any) => {
        if (err.startIndex > endIndex) {
          return {
            ...err,
            startIndex: err.startIndex + lengthDifference,
            endIndex: err.endIndex + lengthDifference,
          };
        }
        return err;
      });

      if (context.options.updateDecorations) {
        context.options.updateDecorations(context);
      }

      if (context.options.hideSuggestions) {
        context.options.hideSuggestions(context);
      }
    };

    this.options.checkGrammar = async (context) => {
      const text = context.editor.state.doc.textContent;

      try {
        context.storage.ignoredErrors.clear();

        const errors: GrammarError[] = await context.options.grammerService(
          text
        );

        // Filter  out invalid error ranges
        // @ts-ignore
        const validErrors = errors.filter((error, index) => {
          const isValidRange =
            error.startIndex < error.endIndex &&
            error.startIndex >= 0 &&
            error.endIndex <= text.length;

          const hasContent =
            text.substring(error.startIndex, error.endIndex).trim().length > 0;

          return isValidRange && hasContent;
        });

        context.storage.errors = validErrors.map((error, index) => ({
          ...error,
          id: `error-${index}`,
        }));

        if (context.options.updateDecorations) {
          context.options.updateDecorations(context);
        }
      } catch (error) {
        console.error("Error in fetching grammar suggestions", error);
      }
    };

    this.options.updateDecorations = (context) => {
      const decorations: Decoration[] = [];

      context.storage.errors.forEach((error: any) => {
        const { startIndex, endIndex, id } = error;
        let currentPos = startIndex;

        while (currentPos < endIndex) {
          const node = context.editor.state.doc.nodeAt(currentPos);
          if (!node) break;

          const nodeEndPos = currentPos + node.nodeSize;
          const decorationEnd = Math.min(nodeEndPos, endIndex);

          decorations.push(
            Decoration.inline(currentPos, decorationEnd, {
              class: "grammar-error",
              "data-error-id": id,
            })
          );

          currentPos = nodeEndPos;
        }
      });

      context.storage.decorations = DecorationSet.create(
        context.editor.state.doc,
        decorations
      );

      context.editor.view.updateState(context.editor.state);
    };

    this.options.clearHideTimeout = (context) => {
      if (context.storage.hideTimeout) {
        clearTimeout(context.storage.hideTimeout);
        context.storage.hideTimeout = null;
      }
    };

    this.options.setHideTimeout = (context) => {
      context.options.clearHideTimeout?.(context);
      context.storage.hideTimeout = setTimeout(() => {
        if (context.options.hideSuggestions) {
          context.options.hideSuggestions(context);
        }
      }, 300);
    };

    this.options.ignoreError = (context, errorId) => {
      context.storage.ignoredErrors.add(errorId);
      context.storage.errors = context.storage.errors.filter(
        (err: any) => err.id !== errorId
      );
      if (context.options.updateDecorations) {
        context.options.updateDecorations(context);
      }
      if (context.options.hideSuggestions) {
        context.options.hideSuggestions(context);
      }
    };

    this.options.handleDocumentChange = (context, view) => {
      // Clear all errors and decorations immediately
      context.storage.errors = [];
      context.storage.decorations = DecorationSet.empty;
      view.updateState(view.state);

      // Debounce the grammar check
      if (context.storage.debouncedCheckGrammar) {
        context.storage.debouncedCheckGrammar(context);
      }
    };

    this.storage.debouncedCheckGrammar = _.debounce((context: any) => {
      if (context.options.checkGrammar) {
        context.options.checkGrammar(context);
      }
    }, this.options.debounceTime);
  },
});
