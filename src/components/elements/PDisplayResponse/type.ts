export type TDisplayResponseBox = {
  content: string;
  title: string;
  type: "MARKDOWN" | "TEXT" | "LATEX";
};

export type TDisplayResponseProps = {
  label?: string;
  listOfBox?: TDisplayResponseBox[];
};
