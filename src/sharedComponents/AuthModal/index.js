import React, { useEffect, useState } from "react";
import Modal from "@/Widgets/Modal";
import Styles from "./index.module.scss";
import Button from "@/Widgets/Button";
// import cx from "classnames";
import OTPScreen from "./OTPScreen";
import PhoneScreen from "./PhoneScreen";
import OptionalScreen from "./OptionalScreen";
import Toast from "../Toast";

import "react-phone-number-input/style.css";
import { parsePhoneNumber } from "react-phone-number-input";

const SCREENS = {
  PHONE_NUMBER: "PHONE_NUMBER",
  OTP: "OTP",
  OPTIONAL: "OPTIONAL",
};

const MASTER_OTP = "1234";

function AuthModal({ isOpen, setIsOpen }) {
  const [otpError, setOTPError] = useState("");
  const [otp, setOTP] = useState("");
  const [phoneInput, setPhoneInput] = useState();
  const [disableCta, setDisableCta] = useState(true);
  const [currentScreen, setCurrentScreen] = useState(SCREENS.PHONE_NUMBER);
  const [showToast, setShowToast] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  const handlePhoneNumber = () => {
    console.log("handlePhoneNumber", parsePhoneNumber(phoneInput));
    setCurrentScreen(SCREENS.OTP);
    setDisableCta(true);
  };

  const handleCtaClick = (isBack = false) => {
    console.log("handleCtaClick", isBack, currentScreen);
    switch (currentScreen) {
      case SCREENS.PHONE_NUMBER:
        handlePhoneNumber();
        break;
      case SCREENS.OTP:
        if (isBack) {
          setCurrentScreen(SCREENS.PHONE_NUMBER);
        } else {
          if (otp == MASTER_OTP) {
            console.log("correct otp");
            setShowToast(true);
            setDisableCta(true);
            setShowSkip(true);
            setCurrentScreen(SCREENS.OPTIONAL);
            setTimeout(() => {
              setShowToast(false);
            }, 3000);
          } else {
            setOTPError("Invalid OTP");
          }
        }
        break;
    }
  };

  const setShowCta = (val) => {
    setDisableCta(!val);
  };

  const componentToRender = () => {
    switch (currentScreen) {
      case SCREENS.PHONE_NUMBER:
        return (
          <PhoneScreen
            phoneInput={phoneInput}
            setPhoneInput={setPhoneInput}
            setDisableCta={setDisableCta}
          />
        );
      case SCREENS.OTP:
        return (
          <OTPScreen
            // setAutoFocusPhone={setAutoFocusPhone}
            otpError={otpError}
            setOTPError={setOTPError}
            otp={otp}
            setOTP={setOTP}
            phone={phoneInput}
            // handleEdit={handleCta}
            setShowCta={setShowCta}
            // section={section}
            handleCta={handleCtaClick}
          />
        );
      case SCREENS.OPTIONAL:
        return <OptionalScreen />;
    }
  };

  return (
    <>
      {showToast && <Toast title="Account Created Successfully!!" />}
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <div className={Styles.authModal}>
          <div className={Styles.authModal__imgWrapper}></div>
          <div className={Styles.authModal__formWrapper}>
            {componentToRender()}
            <Button
              disabled={disableCta}
              onClick={() => handleCtaClick(false)}
              customClass={
                disableCta
                  ? Styles["authModal__formWrapper__btn--disabled"]
                  : Styles.authModal__formWrapper__btn
              }
              name="Continue"
            />
            <span
              className={
                showSkip
                  ? Styles.authModal__formWrapper__skip
                  : Styles["authModal__formWrapper__skip--hidden"]
              }
            >
              Skip
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AuthModal;
