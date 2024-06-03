import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import Styles from "./index.module.scss";
import ReactModal from "react-modal";

const Modal = ({
  children,
  isOpen,
  closeModal,
  showCloseButton = true,
  customClassName,
  width,
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const onClose = (e) => {
    e.stopPropagation();
    document.body.style.position = "";
    document.body.style.top = "";
    closeModal(e);
  };

  const containerClass = isOpen ? "container__visible" : "container";
  const modalClassClass = isOpen ? "modal__visible" : "modal";
  console.log('customclass', customClassName)
  return createPortal(
    <>
      <div className={Styles.wrapper}>
        {isOpen && (
          <div className={Styles[containerClass]}>
            <div className={Styles.modal__mask}></div>
            <div
              className={classNames(Styles[modalClassClass], customClassName)}
              style={customClassName}
              width={width}
            >
              {children}
            </div>
          </div>
        )}
        {showCloseButton && isOpen && (
          <span onClick={onClose} className={Styles.closeButton} />
        )}
      </div>
    </>,
    document.getElementById(`root`)
  );
};

export default Modal;
