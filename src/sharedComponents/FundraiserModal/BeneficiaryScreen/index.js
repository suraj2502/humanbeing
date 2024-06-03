import React from "react";
import Styles from "./index.module.scss";
import Dropdown from "@/sharedComponents/Dropdown";
import BeneficiaryFamilyDetails from "./BeneficiaryFamilyDetails";
import BeneficiaryFriendDetails from "./BeneficiaryFriendDetails";
import BeneficiaryOtherDetails from "./BeneficiaryOtherDetails";

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
  const getFormAccordingToCategory = () => {
    switch (raisingFundsCategory) {
      case "Myself":
        setShowCta(true);
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
