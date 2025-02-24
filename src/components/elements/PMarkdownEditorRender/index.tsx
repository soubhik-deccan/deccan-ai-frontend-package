
import "md-editor-rt/lib/style.css";

import { MdEditor } from "md-editor-rt";

const PMarkdownEditorRender = () => {
  return (
    <div>
      <MdEditor
        autoDetectCode
        autoFocus
        codeFoldable

      />
    </div>
  );
};

export default PMarkdownEditorRender;