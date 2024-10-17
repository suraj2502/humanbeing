import React, { useState } from "react";
import Styles from "./index.module.scss";
import Button from "@/Widgets/Button";
import CallbackForm from "@/sharedComponents/CallbackForm";


function HomeBanner({ data, name }) {
  const [isOpen, setIsOpen] = useState(false);

  // const getSessionId = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/payment", {
  //       method: "POST",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error:", error);
  //     throw error; // Ensure error is propagated for proper error handling
  //   }
  // };

  // const handlePayment = async () => {
  //   const obj = await useCashfree();
  //   let cachfreeCheckoutRes = {};
  //   await getSessionId()
  //     .then((data) => {
  //       console.log("Received data:", data);
  //       cachfreeCheckoutRes = data;
  //       // Handle data as needed
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       // Handle error
  //     });

  //   let checkoutOptions = {
  //     paymentSessionId: cachfreeCheckoutRes.payment_session_id,
  //     returnUrl:
  //       "https://test.cashfree.com/pgappsdemos/v3success.php?myorder={order_id}",
  //   };
  //   console.log("checkoutoptions", checkoutOptions);
  //   obj.checkout(checkoutOptions).then(function (result) {
  //     if (result.error) {
  //       alert(result.error.message);
  //     }
  //     if (result.redirect) {
  //       console.log("Redirection");
  //     }
  //   });
  // };

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
      <span>2024 © Altruvo Social Ventures Pvt. Ltd.</span>
    </section>
  );
}

export default HomeBanner;
