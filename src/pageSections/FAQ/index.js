import React, { useState } from "react";
import Styles from "./index.module.scss";
import ColorTitle from "@/sharedComponents/ColorTitle";
import Accordian from "@/Widgets/Accordian";

function FAQ({ data, name }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={Styles.container} id={name}>
      <ColorTitle text={data.title} />
      {data.faqs?.map((faq, idx) => {
        return (
          <Accordian
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            key={idx}
            currentIndex={idx}
            question={faq.question}
            answer={faq.answer}
          />
        );
      })}
    </section>
  );
}

export default FAQ;
