import { Content } from "@tiptap/react";
import { ReactNode } from "react";

export type TPTiptapEditorProps = {
  enableMenu: boolean;
  disable: boolean;
  onChange?: (value: string) => void;
  isError?: boolean;
  customClassName?: string;
  getGrammerCorrections?: (value: string) => any;
  value: Content;
};

export type TPTiptapEditorMenuOptions = {
  value: string;
  label: string;
  icon?: ReactNode;
};
