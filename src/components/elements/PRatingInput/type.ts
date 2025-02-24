export type TPRatingInputType = {
  question: string;
  ratingOptions: any[];
  rating?: number | null;
  justification?: string;
};

export type TPRatingInputProps = {
  schema: TPRatingInputType[];
  value: TPRatingInputType[];
  isDisabled: boolean;
  onUpdate: (value: TPRatingInputType[]) => void;
};
