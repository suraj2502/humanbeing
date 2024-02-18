import React, { useState } from "react";
import Styles from "./index.module.scss";
import Button from "@/Widgets/Button";
import CallbackForm from "@/sharedComponents/CallbackForm";

function HomeBanner({ data, name }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={Styles.container} id={name}>
      {isOpen && <CallbackForm isOpen={isOpen} setIsOpen={setIsOpen} />}
      <div className={Styles.container__headline}>{data.bannerHeadline}</div>
      <div className={Styles.container__description}>
        {data.bannerDescription}
      </div>
      <div className={Styles.container__comingsoon}>
        Website under construction. Coming Soon!!
      </div>
      <Button
        onClick={() => setIsOpen(true)}
        customClass={Styles.container__button}
        name={data.ctaText}
      />
    </section>
  );
}

export default HomeBanner;
