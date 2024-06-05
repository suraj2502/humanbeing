import React, { useState } from "react";
import Styles from "./index.module.scss";
import Dropdown from "@/sharedComponents/Dropdown";
import BeneficiaryFamilyDetails from "./BeneficiaryFamilyDetails";
import BeneficiaryFriendDetails from "./BeneficiaryFriendDetails";
import BeneficiaryOtherDetails from "./BeneficiaryOtherDetails";
import Checkbox from "@/sharedComponents/Checkbox";

const BENEFICIARY_CATEGORY_DROPDOWN = [
  "Myself",
  "My Family",
  "My Friends",
  "Others",
];

// const [familyRelation, setFamilyRelation] = useState("");

// const [otherFamilyRelation, setOtherFamilyRelation] = useState("");
// const [otherFamilyRelationError, setOtherFamilyRelationError] = useState("");

// const [beneficiaryName, setBeneficiaryName] = useState("");
// const [beneficiaryNameError, setBeneficiaryNameError] = useState("");

// const [beneficiaryDOB, setBeneficiaryDOB] = useState("");

// const [beneficiaryPhoneInput, setBeneficiaryPhoneInput] = useState();
// const [beneficiaryPhoneInputError, setBeneficiaryPhoneInputError] =
//   useState("");
// const [friendRelation, setFriendRelation] = useState("");
// const [otherRelation, setOtherRelation] = useState("");

function BeneficiaryScreen({
  raisingFundsCategory,
  setRaisingFundsCategory,
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
  friendRelation,
  setFriendRelation,
  otherRelation,
  setOtherRelation,
}) {
  const [isChecked, setIsChecked] = useState(false);

  const getFormAccordingToCategory = () => {
    switch (raisingFundsCategory) {
      case "Myself":
        if (isChecked) {
          setShowCta(true);
        } else {
          setShowCta(false);
        }
        break;
      //ask nothing else
      case "My Family":
        // setShowCta(false);
        return (
          <BeneficiaryFamilyDetails
            familyRelation={familyRelation}
            setFamilyRelation={setFamilyRelation}
            otherFamilyRelation={otherFamilyRelation}
            setOtherFamilyRelation={setOtherFamilyRelation}
            beneficiaryName={beneficiaryName}
            setBeneficiaryName={setBeneficiaryName}
            beneficiaryDOB={beneficiaryDOB}
            setBeneficiaryDOB={setBeneficiaryDOB}
            beneficiaryPhoneInput={beneficiaryPhoneInput}
            setBeneficiaryPhoneInput={setBeneficiaryPhoneInput}
            setShowCta={setShowCta}
            isChecked={isChecked}
          />
        );
      // ask beneficiary relation father/mother/brother/sister -> others -> text field -> name/age/contact
      case "My Friends":
        // setShowCta(false);
        return (
          <BeneficiaryFriendDetails
            friendRelation={friendRelation}
            setFriendRelation={setFriendRelation}
            beneficiaryName={beneficiaryName}
            setBeneficiaryName={setBeneficiaryName}
            beneficiaryDOB={beneficiaryDOB}
            setBeneficiaryDOB={setBeneficiaryDOB}
            beneficiaryPhoneInput={beneficiaryPhoneInput}
            setBeneficiaryPhoneInput={setBeneficiaryPhoneInput}
            setShowCta={setShowCta}
            isChecked={isChecked}
          />
        );
      // know from -> text field -> name/age/contact
      case "Others":
        // setShowCta(false);
        return (
          <BeneficiaryOtherDetails
            otherRelation={otherRelation}
            setOtherRelation={setOtherRelation}
            beneficiaryName={beneficiaryName}
            setBeneficiaryName={setBeneficiaryName}
            beneficiaryDOB={beneficiaryDOB}
            setBeneficiaryDOB={setBeneficiaryDOB}
            beneficiaryPhoneInput={beneficiaryPhoneInput}
            setBeneficiaryPhoneInput={setBeneficiaryPhoneInput}
            setShowCta={setShowCta}
            isChecked={isChecked}
          />
        );
      // know from -> text field -> name/age/contact
    }
  };

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.wrapper__category}>
        <span>You are raising funds for</span>
        <Dropdown
          defaultValue={raisingFundsCategory}
          list={BENEFICIARY_CATEGORY_DROPDOWN}
          placeholder="Select Category"
          handleChange={(val) => setRaisingFundsCategory(val)}
          customClass={Styles.wrapper__category__dropdown}
        />
      </div>
      {raisingFundsCategory && (
        <div className={Styles.checkbox}>
          <Checkbox
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            label={`I have read <a target="_blank" href="/terms-and-conditions">Terms & Conditions</a>, and accept them.`}
          />
        </div>
      )}
      {raisingFundsCategory && getFormAccordingToCategory()}
      {/* <Button
        disabled={!showCta}
        onClick={() => handleCtaClick(false)}
        customClass={
          !showCta ? Styles.wrapper__btnDisabled : Styles.wrapper__btn
        }
        name="Continue"
      /> */}
    </div>
  );
}

export default BeneficiaryScreen;
