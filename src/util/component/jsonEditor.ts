import { linter } from "@codemirror/lint";

import { Diagnostic } from "@codemirror/lint";
import { EditorView } from "@tiptap/pm/view";

export const jsonLinter = linter((view) => {
  const diagnostics: Diagnostic[] = [];
  try {
    JSON.parse(view.state.doc.toString());
  } catch (e: any) {
    const message = e.message;
    const position = e.position || 0;
    diagnostics.push({
      from: position,
      to: position,
      severity: "error",
      message,
    });
  }
  return diagnostics;
});

export const formatJSON = () => {
  return (view: EditorView) => {
    const doc = view.state.doc.toString();
    try {
      const formatted = JSON.stringify(JSON.parse(doc), null, 2);
      view.dispatch(
        view.state.tr.replaceWith(
          0,
          view.state.doc.content.size,
          view.state.schema.text(formatted)
        )
      );
    } catch (e: any) {
      console.error("Failed to format JSON:", e.message);
    }
    return true;
  };
};
