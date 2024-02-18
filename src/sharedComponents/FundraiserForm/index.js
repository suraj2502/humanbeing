import React, { useState } from "react";
import Styles from "./index.module.scss";
import Input from "@/Widgets/InputBox";
import Dropdown from "../Dropdown";
import Toggle from "../Toggle";

const CAMPAIGN_CATEGORY_DROPDOWN_LIST = ["Medical", "Education", "Others"];

function FundraiserForm() {
  const [campaignNameInput, setCampaignNameInput] = useState("");
  const [campaignNameError, setCampaignNameError] = useState("");

  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignDescriptionError, setCampaignDescriptionError] = useState("");

  const [campaignCategory, setCampaignCategory] = useState("");

  const [campaignBenificiary, setCampaignBenificiary] = useState("");
  const [campaignBenificiaryError, setCampaignBenificiaryError] = useState("");

  const [relation, setRelation] = useState("");
  const [relationError, setRelationError] = useState("");

  const [showToggle, setShowToggle] = useState(false);

  //   const [campaign]

  const campaignNameHandleBlur = () => {
    if (!campaignNameInput) {
      setCampaignNameError("Campaign Name cannot be empty");
    } else {
      setCampaignNameError("");
    }
  };

  const campaignDescriptionHandleBlur = () => {
    if (!campaignDescription) {
      setCampaignDescriptionError("Campaign Description cannot be empty");
    } else {
      setCampaignDescriptionError("");
    }
  };

  const campaignBeneficaryHandleBlur = () => {
    if (!campaignBenificiary) {
      setCampaignBenificiaryError("This field cannot be empty");
    } else {
      setCampaignBenificiaryError("");
    }
  };

  const relationHandleBlur = () => {
    if (!relation) {
      setRelationError("This field cannot be empty");
    } else {
      setRelationError("");
    }
  };
  return (
    <div className={Styles.container}>
      <h1>Please enter the below details</h1>
      <Input
        value={campaignNameInput}
        onChange={(e) => setCampaignNameInput(e.target.value)}
        name="campaignNameInput"
        label="Campaign Name"
        handleBlur={campaignNameHandleBlur}
        errorMsg={campaignNameError}
        // customClass={Styles.optionalWrapper__inputs__field}
      />
      <Input
        value={campaignDescription}
        onChange={(e) => setCampaignDescription(e.target.value)}
        name="campaignDescription"
        label="Campaign Description"
        handleBlur={campaignDescriptionHandleBlur}
        errorMsg={campaignDescriptionError}
        // customClass={Styles.optionalWrapper__inputs__field}
      />
      <Dropdown
        defaultValue={campaignCategory}
        list={CAMPAIGN_CATEGORY_DROPDOWN_LIST}
        placeholder="Select Campaign Category"
        handleChange={setCampaignCategory}
        customClass={Styles.container__dropdown}
      />
      <Input
        value={campaignBenificiary}
        onChange={(e) => setCampaignBenificiary(e.target.value)}
        name="campaignBenifiiter"
        label="Name of the person/organisation this campaign will benefit to"
        handleBlur={campaignBeneficaryHandleBlur}
        errorMsg={campaignBenificiaryError}
        // customClass={Styles.optionalWrapper__inputs__field}
      />
      <Input
        value={relation}
        onChange={(e) => setRelation(e.target.value)}
        name="relation"
        label="How are you related to benficiary ?"
        handleBlur={relationHandleBlur}
        errorMsg={relationError}
        // customClass={Styles.optionalWrapper__inputs__field}
      />
      <div className={Styles.container__currency}>
        <span>INR</span>
        <Toggle showToggle={showToggle} setShowToggle={setShowToggle} />
        <span>USD</span>
      </div>
    </div>
  );
}

export default FundraiserForm;
