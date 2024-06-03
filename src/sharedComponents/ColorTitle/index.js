import React from "react";
import Styles from "./index.module.scss";

function ColorTitle({ text }) {
  return (
    <h2
      dangerouslySetInnerHTML={{ __html: text }}
      className={Styles.colorTitle}
    />
  );
}

export default ColorTitle;
