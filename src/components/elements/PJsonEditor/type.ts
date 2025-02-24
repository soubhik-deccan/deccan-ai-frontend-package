import { Extension } from "@codemirror/state";
import { EditorViewConfig, ViewUpdate } from "@codemirror/view";

export type PJsonEditorProps = {
  /** Controlled value of the editor */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Callback when the content changes */
  onChange?: (value: string) => void;
  /** Additional CodeMirror extensions */
  extensions?: Extension[];
  /** Optional placeholder text */
  placeholder?: string;
  /** Additional options to configure the editor */
  options?: Partial<EditorViewConfig>;
  /** Event handlers */
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onUpdate?: (update: ViewUpdate) => void;
  disabled?: boolean;
};
