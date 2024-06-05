import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import BeneficiaryCommonDetails from "../BeneficiaryCommonDetails";
import Input from "@/Widgets/InputBox";

function BeneficiaryOtherDetails({
  setShowCta,
  otherRelation,
  setOtherRelation,
  beneficiaryName,
  setBeneficiaryName,
  beneficiaryDOB,
  setBeneficiaryDOB,
  beneficiaryPhoneInput,
  setBeneficiaryPhoneInput,
  isChecked,
}) {
  // const [otherRelation, setOtherRelation] = useState("");
  const [otherRelationError, setOtherRelationError] = useState("");

  // const [beneficiaryName, setBeneficiaryName] = useState("");
  const [beneficiaryNameError, setBeneficiaryNameError] = useState("");
  // const [beneficiaryDOB, setBeneficiaryDOB] = useState("");

  // const [beneficiaryPhoneInput, setBeneficiaryPhoneInput] = useState();
  const [beneficiaryPhoneInputError, setBeneficiaryPhoneInputError] =
    useState("");

  useEffect(() => {
    if (isChecked) {
      if (beneficiaryPhoneInputError) {
        setShowCta(false);
        return;
      }
      if (
        otherRelation &&
        beneficiaryName &&
        beneficiaryDOB &&
        beneficiaryPhoneInput
      ) {
        setShowCta(true);
      } else {
        setShowCta(false);
      }
    } else {
      setShowCta(false);
    }
  }, [
    otherRelation,
    beneficiaryName,
    beneficiaryDOB,
    beneficiaryPhoneInput,
    beneficiaryPhoneInputError,
    isChecked,
  ]);

  const handleBlur = () => {
    if (!otherRelation) {
      setOtherRelationError("Field cannot be empty");
    } else {
      setOtherRelationError("");
    }
  };

  return (
    <div className={Styles.container}>
      <Input
        value={otherRelation}
        onChange={(e) => setOtherRelation(e.target.value)}
        name="otherRelation"
        label="Relation with beneficiary"
        handleBlur={handleBlur}
        errorMsg={otherRelationError}
        customClass={Styles.container__input}
      />
      <BeneficiaryCommonDetails
        beneficiaryName={beneficiaryName}
        setBeneficiaryName={setBeneficiaryName}
        beneficiaryNameError={beneficiaryNameError}
        setBeneficiaryNameError={setBeneficiaryNameError}
        beneficiaryDOB={beneficiaryDOB}
        setBeneficiaryDOB={setBeneficiaryDOB}
        beneficiaryPhoneInput={beneficiaryPhoneInput}
        setBeneficiaryPhoneInput={setBeneficiaryPhoneInput}
        beneficiaryPhoneInputError={beneficiaryPhoneInputError}
        setBeneficiaryPhoneInputError={setBeneficiaryPhoneInputError}
      />
    </div>
  );
}

export default BeneficiaryOtherDetails;
