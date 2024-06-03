import React, { useState } from "react";
import Styles from "./index.module.scss";
import ColorTitle from "@/sharedComponents/ColorTitle";
import Button from "@/Widgets/Button";
import CallbackForm from "@/sharedComponents/CallbackForm";
import AuthModal from "@/sharedComponents/AuthModal";

const defaultStrings = {
  title: "Still have doubts? Talk to our expert",
  ctaTitle: "Request a callback",
};

function CallbackBanner({ data, name, isMobile }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={Styles.container} id={name}>
      {isOpen && (
        <CallbackForm
          isMobile={isMobile}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      {/* {isOpen && (
        <AuthModal isMobile={isMobile} isOpen={isOpen} setIsOpen={setIsOpen} />
      )} */}
      <div className={Styles.innerContainer}>
        <h2>{data.title || defaultStrings.title}</h2>
        <Button
          onClick={() => setIsOpen(true)}
          customClass={Styles.container__btn}
          name={data.ctaTitle || defaultStrings.ctaTitle}
        />
      </div>
      {/* <h2>Still have doubts? Talk to our expert</h2>
      <Button
        onClick={() => setIsOpen(true)}
        customClass={Styles.container__btn}
        name="Request a callback"
      /> */}
    </section>
  );
}

export default CallbackBanner;
