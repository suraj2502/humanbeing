import React from "react";
import classNames from "classnames";
import Styles from "./index.module.scss";

function ProfileImage({ name = "", customClass }) {
  const getInitialLetter = () => {
    if (!name) {
      return "A";
    }

    return name[0]?.toUpperCase();
  };

  return (
    <div className={classNames(Styles.container, customClass)}>
      <span>{getInitialLetter(name)}</span>
    </div>
  );
}

export default ProfileImage;
