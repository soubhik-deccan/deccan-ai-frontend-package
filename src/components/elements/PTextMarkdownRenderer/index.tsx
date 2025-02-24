import React from "react";
import { TPTextMarkdownRendererProps } from "../../..";
import PMarkdownRenderer from "../PMarkDownRender";

const PTextMarkdownRenderer: React.FC<TPTextMarkdownRendererProps> = ({
  textData,
  title,
}) => {
  return (
    <div className="p-text-markdownrenderer_wrapper">
      <div className="p-text-markdownrenderer__content-box">
        {title && <p className="p-text-markdownrenderer__title">{title}</p>}
        <div className="p-text-markdownrenderer__content">
          <PMarkdownRenderer content={textData} />
        </div>
      </div>
    </div>
  );
};

export default PTextMarkdownRenderer;
