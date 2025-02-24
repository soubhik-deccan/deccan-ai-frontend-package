import React from "react";
import { TPTabProps } from "./type";

const PTab: React.FC<TPTabProps> = ({ label, isActive, onClick, index }) => {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${index}`}
      id={`tab-${index}`}
      className={`p-tab ${isActive ? "p-tab--active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

PTab.displayName = "PTab";

export default PTab;
