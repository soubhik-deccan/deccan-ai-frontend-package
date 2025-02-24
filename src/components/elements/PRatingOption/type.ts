import { TPRatingGroupOption, TPRatingValue } from "../PRatingMarkerGroup/type";

export type TPRatingOptionProps = {
  option: TPRatingGroupOption;
  index: number;
  selectedRating: TPRatingValue;
  errorQuestionIndices: number[];
  disabled: boolean;
  onRatingClick: (newValue: string | number) => void;
  onCheckboxChange: (checkboxContent: string, checked: boolean) => void;
  onInputChange: (checkboxContent: string, inputValue: string) => void;
  onRadioReasonChange: (reason: string) => void;
};
