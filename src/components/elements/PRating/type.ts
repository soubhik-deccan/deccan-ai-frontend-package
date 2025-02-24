export type TPRatingProps = {
  value: number | null;
  onChange: (newValue: number) => void;
  size?: "small" | "medium" | "large";
  error?: boolean;
  maxValue?: number;
  disabled?: boolean;
  type?: string;
  useCircles?: boolean;
};
