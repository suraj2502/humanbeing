import React from "react";
import Styles from "./index.module.scss";

function Toast({ title }) {
  return <span className={Styles.toast}>{title}</span>;
}

export default Toast;
