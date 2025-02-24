import React from "react";
import { TPTabPanelProps } from "./type";

const PTabPanel: React.FC<TPTabPanelProps> = ({
  children,
  isActive,
  index,
}) => {
  return (
    <div
      role="tabpanel"
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      hidden={!isActive}
      className="p-tab-panel"
    >
      {children}
    </div>
  );
};

PTabPanel.displayName = "PTabPanel";

export default PTabPanel;
