export type TPRatingOption = {
  value: number | string;
  displayLabel: string;
};

export type TPRateMarkerProps = {
  options: TPRatingOption[];
  selectedRating: number | string | null;
  onRatingClick: (rating: number | string) => void;
  disabled?: boolean;
  className?: string;
  initialValue?: string | number | null;
};
