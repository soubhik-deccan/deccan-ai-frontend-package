// src/Tiptap.tsx
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import ListItem from "@tiptap/extension-list-item";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { Editor, EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC, useCallback, useEffect, useState } from "react";
import { GrammarCheck } from "./CustomExtensions/Grammer";
import { MenuBar } from "./MenuBar";
import { TPTiptapEditorProps } from "./type";

const defaultExtensions = [
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  // Gapcursor,
  Color.configure({
    types: [TextStyle.name, ListItem.name],
  }),
  TextStyle.configure(),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when trying to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Highlight.configure({ multicolor: true }),
  Underline,
];

const PTiptapEditor: FC<TPTiptapEditorProps> = ({
  enableMenu = false,
  disable = false,
  // @ts-ignore
  onChange = (val: string) => {},
  isError = false,
  customClassName,
  getGrammerCorrections,
  value = `<p></p>`,
}) => {
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null); // Store editor instance

  // Combine default extensions with conditional GrammarCheck
  const extensions = [
    ...defaultExtensions,
    ...(getGrammerCorrections
      ? [
          GrammarCheck.configure({
            debounceTime: 1000,
            grammerService: getGrammerCorrections,
          }),
        ]
      : []),
  ];

  const handleUpdate = useCallback(
    ({ editor }: { editor: Editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    [onChange]
  );

  // Effect to update the editor content whenever the `value` prop changes
  useEffect(() => {
    if (editorInstance && value !== editorInstance.getHTML()) {
      editorInstance.commands.setContent(value);
    }
  }, [value, editorInstance]);

  // Set the editor instance when it's available from EditorProvider
  const handleEditorInit = useCallback((editor: Editor) => {
    setEditorInstance(editor);
  }, []);

  return (
    <div
      className={`tiptap-editor-wrapper ${enableMenu ? "" : " without-menu"} ${
        disable ? " disabled" : ""
      } ${isError ? " error" : ""}  ${customClassName}`}
    >
      {value && (
        <EditorProvider
          editable={!disable}
          extensions={extensions as any}
          content={value}
          slotBefore={enableMenu && <MenuBar />}
          onUpdate={handleUpdate}
          onCreate={({ editor }) => handleEditorInit(editor)} // Save editor instance when created
        ></EditorProvider>
      )}
    </div>
  );
};

export default PTiptapEditor;
