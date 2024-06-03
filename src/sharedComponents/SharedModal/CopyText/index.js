import React, { useRef } from "react";
// import Image from "next/image";
// import getImageUrl from "../../../../../utils/getImageUrl";
import Styles from "./index.module.scss";

function CopyText({ label, message, value, name, handleClick }) {
  const textRef = useRef();

  const copyToClipboard = () => {
    const text = textRef.current;
    text.select();
    text.setSelectionRange(0, 99999);
    if (!navigator.clipboard) {
      document.execCommand("copy");
    } else {
      navigator.clipboard.writeText(value);
    }
    handleClick?.(value, name, message);
  };

  return (
    <div className={Styles.main}>
      {label && <h6 className={Styles.main__label}>{label}</h6>}
      <div className={Styles.main__inputWrapper}>
        <input
          className={Styles.main__inputWrapper__input}
          readOnly
          value={value}
          ref={textRef}
        />
        <div
          className={Styles.main__inputWrapper__copy}
          onClick={copyToClipboard}
        >
          <span className={Styles.main__inputWrapper__copy__copyImg}>
            {/* <Image
              src={getImageUrl("content-copy__1666333780859", "png")}
              width={24}
              height={24}
              objectPosition="center"
              priority
              unoptimized
            /> */}
          </span>
          <span className={Styles.main__inputWrapper__copy__copyText}>
            Copy
          </span>
        </div>
      </div>
    </div>
  );
}

export default CopyText;
