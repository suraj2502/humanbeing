import React, { useState } from "react";
import classNames from "classnames";
import Styles from "./index.module.scss";

function Dropdown({
  list,
  placeholder,
  darkTheme,
  handleChange,
  defaultValue,
  customClass,
}) {
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleOpen = () => {
    setOpen(!isOpen);
  };

  const handleKeyDown = (event, callback) => {
    if ([13, 32].includes(event.keyCode)) {
      callback();
      event.preventDefault();
    }
  };

  const handleClick = (event, item) => {
    setValue(item);
    handleChange(item);
    setOpen(!isOpen);
    event.currentTarget?.parentElement?.parentElement?.focus();
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  };

  return (
    <div className={classNames(Styles.main, customClass)}>
      <button
        className={classNames(Styles.selectBox, {
          [Styles.open]: isOpen,
          [Styles.darkTheme]: darkTheme,
        })}
        onKeyDown={(event) => handleKeyDown(event, () => setOpen(!isOpen))}
        onClick={handleOpen}
        onBlur={handleBlur}
      >
        <span>{value}</span>
        <label className={Styles.label}>{placeholder}</label>
        <div className={Styles.arrow} />
        <div
          className={classNames(Styles.options, {
            [Styles.options__selected]: isOpen,
          })}
        >
          <div className={Styles.container}>
            {list.map((item, index) => (
              <div
                key={index}
                className={Styles.item}
                tabIndex={0}
                role="button"
                onKeyDown={(event) =>
                  handleKeyDown(event, () => handleClick(event, item))
                }
                onClick={(event) => handleClick(event, item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
}

export default Dropdown;
