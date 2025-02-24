import { FC } from "react";
import { isBase64 } from "validator";
import { base64ToString } from "../../../util/common/converter";
import PLatexRender from "../PLatexRender";
import PTextMarkdownRenderer from "../PTextMarkdownRenderer";
import PTextRenderer from "../PTextRenderer";
import { TDisplayResponseProps } from "./type";

const PDisplayResponse: FC<TDisplayResponseProps> = ({
  label = "",
  listOfBox = [],
}) => {
  const renderedBoxes = listOfBox.map((item, index) => {
    const content = (() => {
      const contentValue = item.content || "";
      return isBase64(contentValue)
        ? base64ToString(contentValue)
        : contentValue;
    })();
    const title = item.title || "";

    switch (item.type) {
      case "MARKDOWN":
        return (
          <PTextMarkdownRenderer key={index} textData={content} title={title} />
        );
      case "TEXT":
        return <PTextRenderer key={index} textData={content} title={title} />;
      case "LATEX":
        return (
          <PLatexRender key={index} content={content} />
        );
      default:
        return null;
    }
  });

  return (
    <div className="p-display-response">
      {label && <div className="p-display-response__header">{label}</div>}
      <div className="p-display-response__content">{renderedBoxes}</div>
    </div>
  );
};

export default PDisplayResponse;
