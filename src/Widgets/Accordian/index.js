import React from "react";
import Styles from "./index.module.scss";
import DownArrow from "@/assets/icons/DownArrow";
import UpArrow from "@/assets/icons/UpArrow";

function Accordian({
  question,
  answer,
  activeIndex = 0,
  currentIndex,
  setActiveIndex,
}) {
  const handleAccordianClick = () => {
    if (activeIndex === currentIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(currentIndex);
    }
  };

  return (
    <div onClick={handleAccordianClick} className={Styles.accordian}>
      <div
        className={
          activeIndex === currentIndex
            ? Styles.accordian__questionContainerActive
            : Styles.accordian__questionContainer
        }
      >
        <span className={Styles.accordian__questionContainer__question}>
          {question}
        </span>
        <DownArrow />
      </div>
      {activeIndex === currentIndex && (
        <span className={Styles.accordian__answer}>{answer}</span>
      )}
    </div>
  );
}

export default Accordian;
