import React, { useState } from "react";
import Styles from "./index.module.scss";
import ColorTitle from "@/sharedComponents/ColorTitle";
import Button from "@/Widgets/Button";
import CallbackForm from "@/sharedComponents/CallbackForm";
import AuthModal from "@/sharedComponents/AuthModal";

function CallbackBanner({ data, name }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={Styles.container} id={name}>
      {/* {isOpen && <CallbackForm isOpen={isOpen} setIsOpen={setIsOpen} />} */}
      {isOpen && <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      <h2>Still have doubts? Talk to our expert</h2>
      <Button
        onClick={() => setIsOpen(true)}
        customClass={Styles.container__btn}
        name="Request a callback"
      />
    </section>
  );
}

export default CallbackBanner;
