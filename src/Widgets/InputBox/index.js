import React, { useState } from "react";
import Styles from "./index.module.scss";
import classNames from "classnames";

const Input = ({
  customClass,
  label,
  value,
  handleBlur,
  errorMsg,
  isLongInput = false,
  ...rest
}) => {
  return (
    <>
      <div className={classNames(Styles.inputOutline, customClass)}>
        {isLongInput ? (
          <textarea onBlur={handleBlur} type="text" {...rest} value={value} />
        ) : (
          <input onBlur={handleBlur} type="text" {...rest} value={value} />
        )}
        <span className={Styles.inputOutline__border} />
        <label>{label}</label>
      </div>
      {errorMsg && <span className={Styles.error}>{errorMsg}</span>}
    </>
  );
};

export default Input;
