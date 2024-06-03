import React from "react";
import Styles from "./index.module.scss";

function IconWrapper({ children, color }) {
  return (
    <div
      style={{
        border: `2px solid ${color}`,
        borderRadius: "50%",
        display: "flex",
      }}
    >
      {children}
    </div>
  );
}

export default IconWrapper;
