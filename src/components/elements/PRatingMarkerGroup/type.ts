export type TPRatingMarkerOption = {
  value: number;
  displayLabel: string;
};

export type TPRatingGroupOption = {
  title: string;
  options: TPRatingMarkerOption[];
  description?: string;
  toolTip?: {
    enable: boolean;
    content: string;
  };
  checkBox?: Array<{
    enable: boolean;
    content?: string | null;
    showInputForOption?: boolean;
    toolTip?: {
      enable: boolean;
      content?: string | null;
    };
  }>;
  showInputForOption?: boolean;
};

export type TPRatingCheckboxReason = {
  [key: string]: {
    value: boolean;
    reason: string;
  };
};

export type TPComplexRatingValue = {
  value: string | number | null;
  explanation: TPRatingCheckboxReason;
  reason?: string;
};

export type TPSimpleRatingValue = string | number | null;

export type TPRatingValue = TPComplexRatingValue | TPSimpleRatingValue;

export type TPRatingMarkerGroupProps = {
  listOfOptions: TPRatingGroupOption[];
  onGroupRatingsChange: (ratings: Record<string, TPRatingValue>) => void;
  value?: Record<string, any>;
  disabled?: boolean;
  className?: string;
  errorQuestionIndices?: number[];
};
