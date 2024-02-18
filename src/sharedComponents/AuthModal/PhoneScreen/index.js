import React, { useState, useEffect } from "react";
import Styles from "./index.module.scss";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

function PhoneScreen({ setDisableCta, phoneInput, setPhoneInput }) {
  const [phoneError, setPhoneError] = useState("");

  const phoneHandleBlur = () => {
    if (phoneInput) {
      if (isValidPhoneNumber(phoneInput) === false) {
        setPhoneError("Invalid Phone Number");
      }
    }
  };

  useEffect(() => {
    if (phoneInput) {
      if (isValidPhoneNumber(phoneInput)) {
        setDisableCta(false);
        setPhoneError("");
      } else {
        setDisableCta(true);
      }
    }
  }, [phoneInput]);

  return (
    <>
      <span className={Styles.title}>Welcome! Sign Up or Login</span>
      <PhoneInput
        placeholder="Enter phone number"
        value={phoneInput}
        defaultCountry="IN"
        onChange={setPhoneInput}
        onBlur={phoneHandleBlur}
        className={Styles.phoneInputCustom}
        limitMaxLength
        autoComplete="tel"
        // onFocus={}
        // style={{
        //   border: "1px solid #dfe1e6",
        //   display: "flex",
        //   padding: "0px 8px",
        //   background: "#fff",
        //   borderRadius: "8px",
        //   height: "44px",
        //   overflow: "hidden",
        //   alignItems: "center",
        // }}
        // containerStyle={{
        //   border: "10px solid black",
        // }}
        // inputStyle={{
        //   background: "lightblue",
        // }}
        // inputComponent={getPhoneInputBox}
      />
      {phoneError && <p className={Styles.error}>{phoneError}</p>}
    </>
  );
}

export default PhoneScreen;
