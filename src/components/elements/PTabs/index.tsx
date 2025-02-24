import React, { Children, cloneElement, useState } from "react";
import { TPTabsProps } from "./type";

const PTabs: React.FC<TPTabsProps> = ({
  children,
  defaultActiveTab = 0,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const tabs: React.ReactElement[] = [];
  const tabPanels: React.ReactElement[] = [];

  Children.forEach(children, (child: any) => {
    if (child.type.displayName === "PTab") {
      tabs.push(child);
    } else if (child.type.displayName === "PTabPanel") {
      tabPanels.push(child);
    }
  });

  return (
    <div className={`p-tabs ${className || ""}`}>
      <div role="tablist" className="p-tabs__tab-list">
        {tabs.map((tab, index) =>
          cloneElement(tab, {
            isActive: activeTab === index,
            onClick: () => setActiveTab(index),
            key: index,
            index,
          })
        )}
      </div>
      <div className="p-tabs__tab-panel">
        {tabPanels.map((panel, index) =>
          cloneElement(panel, {
            isActive: activeTab === index,
            key: index,
            index,
          })
        )}
      </div>
    </div>
  );
};

export default PTabs;
