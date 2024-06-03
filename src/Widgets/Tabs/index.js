import React, { useState } from "react";
import Styles from "./index.module.scss";

function Tabs({ activeTab, setActiveTab, tabs = [] }) {
  //   const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabChange = (idx) => {
    setActiveTab(tabs[idx]);
  };

  return (
    <div className={Styles.wrapper}>
      {tabs.map((item, idx) => {
        return (
          <div
            onClick={() => handleTabChange(idx)}
            className={
              activeTab === item
                ? Styles.wrapper__active
                : Styles.wrapper__inactive
            }
            key={idx}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default Tabs;
