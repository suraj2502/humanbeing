import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import Dropdown from "@/sharedComponents/Dropdown";
import Input from "@/Widgets/InputBox";
import BeneficiaryCommonDetails from "../BeneficiaryCommonDetails";

const BENEFICIARY_FAMILY_DROPDOWN = [
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Son",
  "Daughter",
  "Others",
];

function BeneficiaryFamilyDetails({
  setShowCta,
  familyRelation,
  setFamilyRelation,
  otherFamilyRelation,
  setOtherFamilyRelation,
  beneficiaryName,
  setBeneficiaryName,
  beneficiaryDOB,
  setBeneficiaryDOB,
  beneficiaryPhoneInput,
  setBeneficiaryPhoneInput,
}) {
  // const [familyRelation, setFamilyRelation] = useState("");

  // const [otherFamilyRelation, setOtherFamilyRelation] = useState("");
  const [otherFamilyRelationError, setOtherFamilyRelationError] = useState("");

  // const [beneficiaryName, setBeneficiaryName] = useState("");
  const [beneficiaryNameError, setBeneficiaryNameError] = useState("");

  // const [beneficiaryDOB, setBeneficiaryDOB] = useState("");

  // const [beneficiaryPhoneInput, setBeneficiaryPhoneInput] = useState();
  const [beneficiaryPhoneInputError, setBeneficiaryPhoneInputError] =
    useState("");

  const handleBlur = () => {
    if (!otherFamilyRelation) {
      setOtherFamilyRelationError("Field cannot be empty");
    } else {
      setOtherFamilyRelationError("");
    }
  };

  useEffect(() => {
    if (
      familyRelation &&
      beneficiaryName &&
      beneficiaryDOB &&
      beneficiaryPhoneInput
    ) {
      if (beneficiaryPhoneInputError) {
        setShowCta(false);
        return;
      }
      if (familyRelation == "Others") {
        if (otherFamilyRelation) {
          setShowCta(true);
        } else {
          setShowCta(false);
        }
      } else {
        console.log("inside set true");
        setShowCta(true);
      }
    } else {
      setShowCta(false);
    }
  }, [
    familyRelation,
    otherFamilyRelation,
    beneficiaryName,
    beneficiaryDOB,
    beneficiaryPhoneInput,
    beneficiaryPhoneInputError,
  ]);

  return (
    <div className={Styles.container}>
      <div className={Styles.container__relation}>
        <span>Beneficiary is your</span>
        <Dropdown
          defaultValue={familyRelation}
          list={BENEFICIARY_FAMILY_DROPDOWN}
          placeholder="Select Relation"
          handleChange={(val) => setFamilyRelation(val)}
          customClass={Styles.container__relation__dropdown}
        />
      </div>
      {familyRelation && familyRelation == "Others" && (
        <Input
          value={otherFamilyRelation}
          onChange={(e) => setOtherFamilyRelation(e.target.value)}
          name="familyRelation"
          label="Specify Relation"
          handleBlur={handleBlur}
          errorMsg={otherFamilyRelationError}
          customClass={Styles.container__input}
        />
      )}
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

export default BeneficiaryFamilyDetails;
