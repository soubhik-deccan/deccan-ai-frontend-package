import React from "react";
import { unescapeMarkdown } from "../../../util/component/markdown";
import { TPTextRendererProps } from "./type";

const PTextRenderer: React.FC<TPTextRendererProps> = ({ textData, title }) => {
  if (!textData) {
    return null;
  }

  return (
    <div className="p-text-renderer_wrapper">
      <div className="p-text-renderer__content-box">
        {title && <p className="p-text-renderer__title">{title}</p>}
        <textarea
          readOnly
          disabled
          id="p-text-renderer-text-area"
          className="p-text-renderer__text-area"
          value={unescapeMarkdown(textData)}
        />
      </div>
    </div>
  );
};

export default PTextRenderer;
