import React, { useState } from "react";
import Styles from "./index.module.scss";
import Input from "@/Widgets/InputBox";
import PhoneInputCommon from "@/sharedComponents/PhoneInput";
import { isValidPhoneNumber } from "react-phone-number-input";

function BeneficiaryCommonDetails({
  beneficiaryName,
  setBeneficiaryName,
  beneficiaryNameError,
  setBeneficiaryNameError,
  beneficiaryDOB,
  setBeneficiaryDOB,
  beneficiaryPhoneInput,
  setBeneficiaryPhoneInput,
  beneficiaryPhoneInputError,
  setBeneficiaryPhoneInputError,
  isChecked,
}) {
  //   const [beneficiaryName, setBeneficiaryName] = useState("");
  //   const [beneficiaryNameError, setBeneficiaryNameError] = useState("");
  //   const [beneficiaryDOB, setBeneficiaryDOB] = useState("");

  const handleBlurName = () => {
    if (!beneficiaryName) {
      setBeneficiaryNameError("Field cannpt be empty");
    } else {
      setBeneficiaryNameError("");
    }
  };

  const handleDate = (e) => {
    if (new Date().toISOString().split("T")[0] < e.target.value) {
      return;
    }
    setBeneficiaryDOB(e.target.value);
    console.log("date event", e.target.value);
  };

  const phoneHandleBlur = () => {
    if (beneficiaryPhoneInput) {
      if (isValidPhoneNumber(beneficiaryPhoneInput) === false) {
        setBeneficiaryPhoneInputError("Invalid Phone Number");
      } else {
        setBeneficiaryPhoneInputError("");
      }
    }
  };

  return (
    <>
      <Input
        value={beneficiaryName}
        onChange={(e) => setBeneficiaryName(e.target.value)}
        name="beneficiaryName"
        label="Beneficiary Full Name"
        handleBlur={handleBlurName}
        errorMsg={beneficiaryNameError}
        customClass={Styles.input}
      />
      <div className={Styles.dob}>
        <label for="birthday">Beneficiary DOB:</label>
        <input
          value={beneficiaryDOB}
          max={new Date().toISOString().split("T")[0]}
          onChange={handleDate}
          type="date"
          id="birthday"
          name="birthday"
        ></input>
      </div>
      <PhoneInputCommon
        phoneInput={beneficiaryPhoneInput}
        setPhoneInput={setBeneficiaryPhoneInput}
        phoneHandleBlur={phoneHandleBlur}
        customClass={Styles.phoneInputCustom}
        phoneError={beneficiaryPhoneInputError}
      />
    </>
  );
}

export default BeneficiaryCommonDetails;
