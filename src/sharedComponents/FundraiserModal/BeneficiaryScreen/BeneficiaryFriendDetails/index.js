import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import BeneficiaryCommonDetails from "../BeneficiaryCommonDetails";
import Input from "@/Widgets/InputBox";

function BeneficiaryFriendDetails({
  setShowCta,
  friendRelation,
  setFriendRelation,
  beneficiaryName,
  setBeneficiaryName,
  beneficiaryDOB,
  setBeneficiaryDOB,
  beneficiaryPhoneInput,
  setBeneficiaryPhoneInput,
}) {
  // const [friendRelation, setFriendRelation] = useState("");
  const [friendRelationError, setFriendRelationError] = useState("");

  // const [beneficiaryName, setBeneficiaryName] = useState("");
  const [beneficiaryNameError, setBeneficiaryNameError] = useState("");
  // const [beneficiaryDOB, setBeneficiaryDOB] = useState("");

  // const [beneficiaryPhoneInput, setBeneficiaryPhoneInput] = useState();
  const [beneficiaryPhoneInputError, setBeneficiaryPhoneInputError] =
    useState("");

  useEffect(() => {
    if (beneficiaryPhoneInputError) {
      setShowCta(false);
      return;
    }
    if (
      (friendRelation && beneficiaryName && beneficiaryDOB,
      beneficiaryPhoneInput)
    ) {
      setShowCta(true);
    } else {
      setShowCta(false);
    }
  }, [
    friendRelation,
    beneficiaryName,
    beneficiaryDOB,
    beneficiaryPhoneInput,
    beneficiaryPhoneInputError,
  ]);

  const handleBlur = () => {
    if (!friendRelation) {
      setFriendRelationError("Field cannot be empty");
    } else {
      setFriendRelationError("");
    }
  };

  return (
    <div className={Styles.container}>
      <Input
        value={friendRelation}
        onChange={(e) => setFriendRelation(e.target.value)}
        name="friendRelation"
        label="You know your friend from"
        handleBlur={handleBlur}
        errorMsg={friendRelationError}
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

export default BeneficiaryFriendDetails;
