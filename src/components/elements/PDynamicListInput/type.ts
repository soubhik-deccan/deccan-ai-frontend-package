export type PDynamicAddableListComponentMapper = {
  id: string;
  key: string;
  renderType: "input" | "textarea";
  fieldValidation: (value: string) => boolean;
  showNotification?: boolean;
  notificationText?: string;
};

export type TPDynamicAddableListProps = {
  placeholder?: string;
  onItemsChange: (items: Record<string, string>[]) => void;
  value?: Record<string, string>[];
  hideInput?: boolean;
  isError?: boolean;
  inputValidation?: string;
  reRender?: boolean;
  componentMapper: PDynamicAddableListComponentMapper[];
  disabled?: boolean;
};
