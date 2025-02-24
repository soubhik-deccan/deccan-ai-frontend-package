export type TPAccordionProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  iconClassName?: string;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  disabled?: boolean;
};
