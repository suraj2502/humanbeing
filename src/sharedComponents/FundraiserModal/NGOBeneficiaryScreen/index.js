import React, { useState } from "react";
import Styles from "./index.module.scss";
import Dropdown from "@/sharedComponents/Dropdown";
import BeneficiaryCommonDetails from "./BeneficiaryCommonDetails";
// import BeneficiaryFamilyDetails from "./BeneficiaryFamilyDetails";
// import BeneficiaryFriendDetails from "./BeneficiaryFriendDetails";
// import BeneficiaryOtherDetails from "./BeneficiaryOtherDetails";

const BENEFICIARY_CATEGORY_DROPDOWN = ["Ourselves", "Individual", "Group"];

function NGOBeneficiaryScreen({
  raisingFundsCategory,
  setRaisingFundsCategory,
  setShowCta,
  beneficiaryName,
  setBeneficiaryName,
  beneficiaryDOB,
  setBeneficiaryDOB,
  beneficiaryPhoneInput,
  setBeneficiaryPhoneInput,
}) {
  // const [beneficiaryName, setBeneficiaryName] = useState("");
  const [beneficiaryNameError, setBeneficiaryNameError] = useState("");

  // const [beneficiaryDOB, setBeneficiaryDOB] = useState("");

  // const [beneficiaryPhoneInput, setBeneficiaryPhoneInput] = useState();
  const [beneficiaryPhoneInputError, setBeneficiaryPhoneInputError] =
    useState("");

  const getFormAccordingToCategory = () => {
    switch (raisingFundsCategory) {
      case "Ourselves":
        setShowCta(true);
        break;
      //ask nothing else
      case "Individual":
        // setShowCta(false);
        return (
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
        );
      // ask beneficiary relation father/mother/brother/sister -> others -> text field -> name/age/contact
      case "Group":
        // setShowCta(false);
        return (
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
        );
      // // know from -> text field -> name/age/contact
      // case "Cause":
      //   // setShowCta(false);
      //   return <BeneficiaryOtherDetails setShowCta={setShowCta} />;
      // // know from -> text field -> name/age/contact
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

export default NGOBeneficiaryScreen;
