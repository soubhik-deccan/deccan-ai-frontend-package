export type TPTransliterationProps = {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  containerClassName?: string;
  placeholder?: string;
  maxOptions?: number;
  offsetY?: number;
  activeItemStyles?: React.CSSProperties;
};
