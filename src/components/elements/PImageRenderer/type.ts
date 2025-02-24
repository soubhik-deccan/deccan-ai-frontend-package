import { CSSProperties } from "react";

export type TPImageRendererProps = {
  src: string;
  alt: string;
  fallbackSrc?: string;
  customClassName?: string;
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
  shouldLoadLazy?: boolean;
  style?: CSSProperties;
};
