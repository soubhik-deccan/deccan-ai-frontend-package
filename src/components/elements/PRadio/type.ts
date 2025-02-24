export type TPRadioOption = {
  displayLabel: string;
  value: string;
  id: string;
};

export type TPRadioProps = {
  options: TPRadioOption[];
  name: string;
  label: string;
  value: string;
  customClassName?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  radioClassName?: string;
};
