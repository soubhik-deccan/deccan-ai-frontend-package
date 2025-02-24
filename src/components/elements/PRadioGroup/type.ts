export type TPReturnPRadioGroupOption = {
  selectedOptions: Record<string, string>;
  supportedTexts: Record<string, string | null>;
};

type TPRadioGroupToolTip = {
  enable?: boolean;
  content?: string;
};

type TPRadioGroupMetaInfo = {
  toolTip?: TPRadioGroupToolTip;
};

export type TPRadioOption = {
  displayLabel: string;
  id: string;
  value: string;
};

export type TPRadioQuestion = {
  id: string;
  label: string;
  options: TPRadioOption[];
  config: {
    showInputForOptions: string[];
  };
  metaInfo?: TPRadioGroupMetaInfo;
};
export type TPRadioGroupProps = {
  listOfOptions: TPRadioQuestion[];
  customClassName?: string;
  initialValues: TPReturnPRadioGroupOption | Record<string, string>;
  onChange: (data: TPReturnPRadioGroupOption) => void;
  error?: boolean;
  disabled?: boolean;
};
