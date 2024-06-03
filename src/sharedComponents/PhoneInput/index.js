import React from "react";
import Styles from "./index.module.scss";
import PhoneInput from "react-phone-number-input";

function PhoneInputCommon({
  phoneInput,
  setPhoneInput,
  phoneHandleBlur,
  customClass,
  phoneError,
}) {
  return (
    <>
      <PhoneInput
        placeholder="Enter phone number"
        value={phoneInput}
        defaultCountry="IN"
        onChange={setPhoneInput}
        onBlur={phoneHandleBlur}
        className={customClass}
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

export default PhoneInputCommon;
