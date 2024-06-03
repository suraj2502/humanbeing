import React from "react";
import Link from "next/link";
import Styles from "./index.module.scss";

function Button({
  hrefLink = "",
  isPrimary = true,
  name = "",
  customClass = {},
  onClick = () => {},
  disabled = false,
}) {
  return (
    <>
      {hrefLink ? (
        <a href={hrefLink} className={customClass}>
          {name}
        </a>
      ) : (
        <button disabled={disabled} onClick={onClick} className={customClass}>
          {name}
        </button>
      )}
    </>
  );
}

export default Button;
