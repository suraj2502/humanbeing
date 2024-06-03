import React, { useState } from "react";
import Styles from "./index.module.scss";

function Badges({ name, handleClick }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleBadgeClick = () => {
    setIsSelected(!isSelected);
    handleClick?.(name);
  };

  return (
    <div
      onClick={handleBadgeClick}
      className={isSelected ? Styles.activeBadge : Styles.badge}
    >
      {name}
    </div>
  );
}

export default Badges;
