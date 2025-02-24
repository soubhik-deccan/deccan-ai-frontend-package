export type TPTableColumn = {
  header: string;
  dataKey: string;
};

export type TPTableProps = {
  label?: string;
  data: any[];
  columns: TPTableColumn[];
  renderCell?: (dataKey: string, content: any) => React.ReactNode;
};
