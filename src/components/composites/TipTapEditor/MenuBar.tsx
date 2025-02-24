import { useCurrentEditor } from "@tiptap/react";
// Update the import path as needed
import { Divider } from "@mui/joy";
import { Level } from "@tiptap/extension-heading";
import { AiOutlineMergeCells, AiOutlineSplitCells } from "react-icons/ai";
import { BiBold } from "react-icons/bi";
import {
  PiArrowClockwise,
  PiArrowCounterClockwise,
  PiCode,
  PiColumnsPlusLeft,
  PiColumnsPlusRight,
  PiMinus,
  PiQuotes,
  PiRowsPlusBottom,
  PiRowsPlusTop,
  PiTable,
  PiTextStrikethrough,
  PiTextUnderline,
  PiTrash,
} from "react-icons/pi"; // Import icons
import PButton from "../../elements/PButton";
import PSelect from "../../elements/PSelect";
import { TPTiptapEditorMenuOptions } from "./type";

export const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const paragraphOptions: TPTiptapEditorMenuOptions[] = [
    { value: "paragraph", label: "Paragraph" },
    { value: "h1", label: "Heading 1" },
    { value: "h2", label: "Heading 2" },
    { value: "h3", label: "Heading 3" },
    { value: "h4", label: "Heading 4" },
    { value: "h5", label: "Heading 5" },
    { value: "h6", label: "Heading 6" },
  ];

  const listOptions: TPTiptapEditorMenuOptions[] = [
    { value: "bulletList", label: "Bullet List" },
    { value: "orderedList", label: "Ordered List" },
  ];

  const alignOptions: TPTiptapEditorMenuOptions[] = [
    { value: "left", label: "Left Align" },
    { value: "center", label: "Center Align" },
    { value: "right", label: "Right Align" },
  ];

  const highlightOptions: TPTiptapEditorMenuOptions[] = [
    { value: "default", label: "Highlight" },
    { value: "#ffc078", label: "Orange" },
    { value: "#8ce99a", label: "Green" },
    { value: "#74c0fc", label: "Blue" },
    { value: "#b197fc", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "#ffa8a8", label: "Pink" },
  ];

  const tableOptions: TPTiptapEditorMenuOptions[] = [
    {
      value: "insertTable",
      label: "Insert Table",
      icon: <PiTable />,
    },
    {
      value: "addColumnBefore",
      label: "Add Column Before",
      icon: <PiColumnsPlusLeft />,
    },
    {
      value: "addColumnAfter",
      label: "Add Column After",
      icon: <PiColumnsPlusRight />,
    },
    {
      value: "deleteColumn",
      label: "Delete Column",
      icon: <PiTrash />,
    },
    {
      value: "addRowBefore",
      label: "Add Row Before",
      icon: <PiRowsPlusTop />,
    },
    {
      value: "addRowAfter",
      label: "Add Row After",
      icon: <PiRowsPlusBottom />,
    },
    {
      value: "deleteRow",
      label: "Delete Row",
      icon: <PiTrash />,
    },
    {
      value: "deleteTable",
      label: "Delete Table",
      icon: <PiTrash />,
    },
    {
      value: "mergeCells",
      label: "Merge Cells",
      icon: <AiOutlineMergeCells />,
    },
    {
      value: "splitCell",
      label: "Split Cell",
      icon: <AiOutlineSplitCells />,
    },
    {
      value: "toggleHeaderColumn",
      label: "Toggle Header Column",
      icon: <PiTable />,
    },
    {
      value: "toggleHeaderRow",
      label: "Toggle Header Row",
      icon: <PiTable />,
    },
    {
      value: "toggleHeaderCell",
      label: "Toggle Header Cell",
      icon: <PiTable />,
    },
  ];

  const handleTableAction = (value: string | string[] | null) => {
    if (typeof value === "string") {
      switch (value) {
        case "insertTable":
          editor
            .chain()
            .focus()
            .insertTable({
              rows: 3,
              cols: 3,
              withHeaderRow: true,
            })
            .run();
          break;
        case "addColumnBefore":
          editor.chain().focus().addColumnBefore().run();
          break;
        case "addColumnAfter":
          editor.chain().focus().addColumnAfter().run();
          break;
        case "deleteColumn":
          editor.chain().focus().deleteColumn().run();
          break;
        case "addRowBefore":
          editor.chain().focus().addRowBefore().run();
          break;
        case "addRowAfter":
          editor.chain().focus().addRowAfter().run();
          break;
        case "deleteRow":
          editor.chain().focus().deleteRow().run();
          break;
        case "deleteTable":
          editor.chain().focus().deleteTable().run();
          break;
        case "mergeCells":
          editor.chain().focus().mergeCells().run();
          break;
        case "splitCell":
          editor.chain().focus().splitCell().run();
          break;
        case "toggleHeaderColumn":
          editor.chain().focus().toggleHeaderColumn().run();
          break;
        case "toggleHeaderRow":
          editor.chain().focus().toggleHeaderRow().run();
          break;
        case "toggleHeaderCell":
          editor.chain().focus().toggleHeaderCell().run();
          break;
      }
    }
  };

  const handleParagraphChange = (value: string | string[] | null) => {
    if (typeof value === "string") {
      if (value === "paragraph") {
        // @ts-ignore
        editor.chain().focus().setParagraph().run();
      } else if (value.startsWith("h")) {
        const level = parseInt(value.slice(1)) as Level;
        if (level >= 1 && level <= 6) {
          editor.chain().focus().toggleHeading({ level }).run();
        }
      }
    }
  };

  const handleListChange = (value: string | string[] | null) => {
    if (typeof value === "string") {
      if (value === "bulletList")
        // @ts-ignore
        editor.chain().focus().toggleBulletList().run();
      if (value === "orderedList")
        // @ts-ignore
        editor.chain().focus().toggleOrderedList().run();
    }
  };

  const handleAlignChange = (value: string | string[] | null) => {
    if (typeof value === "string") {
      editor
        .chain()
        .focus()
        .setTextAlign(value as "left" | "center" | "right")
        .run();
    }
  };

  const handleHighlightChange = (value: string | string[] | null) => {
    if (typeof value === "string") {
      if (value === "default") {
        editor.chain().focus().toggleHighlight().run();
      } else {
        editor.chain().focus().toggleHighlight({ color: value }).run();
      }
    }
  };

  return (
    <div className="tiptap-menu-bar">
      <div className="redo-undo">
        <PButton
          // @ts-ignore
          onClick={() => editor.chain().focus().undo().run()}
          // @ts-ignore
          disabled={!editor.can().chain().focus().undo().run()}
          variant="secondary"
          icon={<PiArrowCounterClockwise />}
          isOnlyIcon
          size="sm"
          className={"menu-button"}
        />
        <PButton
          // @ts-ignore
          onClick={() => editor.chain().focus().redo().run()}
          // @ts-ignore
          disabled={!editor.can().chain().focus().redo().run()}
          variant="secondary"
          icon={<PiArrowClockwise />}
          isOnlyIcon
          size="sm"
          className={"menu-button"}
        />
      </div>

      <Divider
        orientation="vertical"
        sx={{
          margin: "0px 5px",
          color: "var(--neutrals-8, #e6e6e6)",
          padding: "5px 0px",
        }}
      />

      <PSelect
        value={""}
        options={paragraphOptions}
        onChange={handleParagraphChange}
        placeholder=""
        customClassName="dropdown"
        isClearable={true}
      />

      <Divider
        orientation="vertical"
        sx={{
          margin: "0px 5px",
          color: "var(--neutrals-8, #e6e6e6)",
        }}
      />

      <div className="marks">
        <PButton
          // @ts-ignore
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "primary" : "secondary"}
          icon={<BiBold />}
          isOnlyIcon
          size="sm"
          className={
            editor.isActive("bold") ? "menu-button is-active" : "menu-button"
          }
        />

        {/* <CustomButton
					onClick={() =>
						editor.chain().focus().toggleItalic().run()
					}
					variant={
						editor.isActive("italic")
							? "primary"
							: "secondary"
					}
					icon={<PiTextItalic />}
					isOnlyIcon
					size="sm"
					className={
						editor.isActive("italic")
							? "menu-button is-active"
							: "menu-button"
					}
				/> */}
        <PButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          variant={editor.isActive("underline") ? "primary" : "secondary"}
          icon={<PiTextUnderline />}
          isOnlyIcon
          size="sm"
          className={
            editor.isActive("underline")
              ? "menu-button is-active"
              : "menu-button"
          }
        />
        <PButton
          // @ts-ignore
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant={editor.isActive("strike") ? "primary" : "secondary"}
          icon={<PiTextStrikethrough />}
          isOnlyIcon
          size="sm"
          className={
            editor.isActive("strike") ? "menu-button is-active" : "menu-button"
          }
        />
        {/* <CustomButton
					onClick={() =>
						editor.chain().focus().toggleCode().run()
					}
					variant={
						editor.isActive("code")
							? "primary"
							: "secondary"
					}
					icon={<PiCode />}
					isOnlyIcon
					size="sm"
					className={
						editor.isActive("code")
							? "menu-button is-active"
							: "menu-button"
					}
				/> */}
      </div>

      <Divider
        orientation="vertical"
        sx={{
          margin: "0px 5px",
          color: "var(--neutrals-8, #e6e6e6)",
        }}
      />

      <PButton
        // @ts-ignore
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        variant={editor.isActive("blockquote") ? "primary" : "secondary"}
        icon={<PiQuotes />}
        size="sm"
        className={
          editor.isActive("blockquote")
            ? "menu-button is-active"
            : "menu-button"
        }
        isOnlyIcon
      ></PButton>
      <PButton
        // @ts-ignore
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        variant="secondary"
        icon={<PiMinus />}
        size="sm"
        className={"menu-button"}
        isOnlyIcon
      ></PButton>
      <PButton
        // @ts-ignore
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        variant={editor.isActive("codeBlock") ? "primary" : "secondary"}
        icon={<PiCode />}
        isOnlyIcon
        size="sm"
        className={
          editor.isActive("codeBlock") ? "menu-button is-active" : "menu-button"
        }
      ></PButton>

      <Divider
        orientation="vertical"
        sx={{
          margin: "0px 5px",
          color: "var(--neutrals-8, #e6e6e6)",
        }}
      />

      <PSelect
        value={""}
        options={listOptions}
        onChange={handleListChange}
        placeholder=""
        customClassName="dropdown"
        isClearable={true}
      />
      <Divider
        orientation="vertical"
        sx={{
          margin: "0px 5px",
          color: "var(--neutrals-8, #e6e6e6)",
        }}
      />

      <PSelect
        value={""}
        options={highlightOptions}
        onChange={handleHighlightChange}
        placeholder=""
        customClassName="dropdown"
        isClearable={true}
      />

      <Divider
        orientation="vertical"
        sx={{
          margin: "0px 5px",
          color: "var(--neutrals-8, #e6e6e6)",
        }}
      />

      <PSelect
        value={""}
        options={tableOptions}
        onChange={handleTableAction}
        placeholder=""
        customClassName="dropdown"
        isClearable={true}
      />

      <Divider
        orientation="vertical"
        sx={{
          margin: "0px 5px",
          color: "var(--neutrals-8, #e6e6e6)",
        }}
      />

      <PSelect
        value={""}
        options={alignOptions}
        onChange={handleAlignChange}
        placeholder=""
        customClassName="dropdown"
        isClearable={true}
      />
    </div>
  );
};
