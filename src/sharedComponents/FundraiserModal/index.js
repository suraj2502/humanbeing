import React, { useState } from "react";
import Styles from "./index.module.scss";
import Modal from "@/Widgets/Modal";
import Button from "@/Widgets/Button";
import BeneficiaryScreen from "./BeneficiaryScreen";
import CampaignDetailsScreen from "./CampaignDetailsScreen";
import NGOBeneficiaryScreen from "./NGOBeneficiaryScreen";
import Cookies from "js-cookie";
import { createCampaign } from "@/services/campaign";
import { parsePhoneNumber } from "react-phone-number-input";
// import Toast from "../Toast";

const SCREENS = {
  BENEFICIARY: "BENEFICIARY",
  CAMPAIGN_DETAILS: "CAMPAIGN_DETAILS",
};

const desktopStyle = {
  background: "white",
  borderRadius: 10,
  height: "80%",
  padding: "0px",
  overflowY: "scroll",
};

const mobileStyle = {
  border: "none",
  inset: 0,
  padding: 0,
  borderRadius: 0,
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  transform: "translate(0, 0)",
  left: "0",
  top: "0",
  position: "fixed",
  overflowY: "scroll",
  paddingTop: "32px",
};

const IS_NGO = false;

function FundraiserModal({ isOpen, setIsOpen, isMobile }) {
  const [raisingFundsCategory, setRaisingFundsCategory] = useState("");
  const [showCta, setShowCta] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(SCREENS.BENEFICIARY);
  const isNgo = Cookies.get("userType") == "ngo";
  // const [showToast, setShowToast] = useState(false);

  const [familyRelation, setFamilyRelation] = useState("");
  const [friendRelation, setFriendRelation] = useState("");
  const [otherRelation, setOtherRelation] = useState("");

  const [otherFamilyRelation, setOtherFamilyRelation] = useState("");
  // const [otherFamilyRelationError, setOtherFamilyRelationError] = useState("");

  const [beneficiaryName, setBeneficiaryName] = useState("");
  // const [beneficiaryNameError, setBeneficiaryNameError] = useState("");

  const [beneficiaryDOB, setBeneficiaryDOB] = useState("");

  const [beneficiaryPhoneInput, setBeneficiaryPhoneInput] = useState();

  const [formResponses, setFormResponses] = useState({
    campaignTitle: "",
    campaignCategory: "",
    campaignDescription: "",
    camapaignImages: [],
    currency: "",
    targetAmount: null,
    supportingDocs: [],
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    kycDocs: [],
  });
  // const [beneficiaryPhoneInputError, setBeneficiaryPhoneInputError] =
  //   useState("");

  // const getFormAccordingToCategory = () => {
  //   switch (raisingFundsCategory) {
  //     case "Myself":
  //       setShowCta(true);
  //       return <div>All godd</div>;
  //       break;
  //     //ask nothing else
  //     case "My Family":
  //     // ask beneficiary relation father/mother/brother/sister -> others -> text field -> name/age/contact
  //     case "My Friends":
  //     // know from -> text field -> name/age/contact
  //     case "Others":
  //     // know from -> text field -> name/age/contact
  //   }
  // };

  const getComponentAccordingToScreen = () => {
    switch (currentScreen) {
      case SCREENS.BENEFICIARY:
        return (
          <>
            {isNgo ? (
              <NGOBeneficiaryScreen
                setShowCta={setShowCta}
                raisingFundsCategory={raisingFundsCategory}
                setRaisingFundsCategory={setRaisingFundsCategory}
                beneficiaryName={beneficiaryName}
                setBeneficiaryName={setBeneficiaryName}
                beneficiaryDOB={beneficiaryDOB}
                setBeneficiaryDOB={setBeneficiaryDOB}
                beneficiaryPhoneInput={beneficiaryPhoneInput}
                setBeneficiaryPhoneInput={setBeneficiaryPhoneInput}
              />
            ) : (
              <BeneficiaryScreen
                familyRelation={familyRelation}
                setFamilyRelation={setFamilyRelation}
                otherFamilyRelation={otherFamilyRelation}
                beneficiaryName={beneficiaryName}
                beneficiaryDOB={beneficiaryDOB}
                setBeneficiaryDOB={setBeneficiaryDOB}
                beneficiaryPhoneInput={beneficiaryPhoneInput}
                setShowCta={setShowCta}
                raisingFundsCategory={raisingFundsCategory}
                setRaisingFundsCategory={setRaisingFundsCategory}
                friendRelation={friendRelation}
                setFriendRelation={setFriendRelation}
                setBeneficiaryName={setBeneficiaryName}
                otherRelation={otherRelation}
                setOtherRelation={setOtherRelation}
                setOtherFamilyRelation={setOtherFamilyRelation}
                setBeneficiaryPhoneInput={setBeneficiaryPhoneInput}
              />
            )}
          </>
          // <BeneficiaryScreen
          //   setShowCta={setShowCta}
          //   raisingFundsCategory={raisingFundsCategory}
          //   setRaisingFundsCategory={setRaisingFundsCategory}
          // />
        );
      case SCREENS.CAMPAIGN_DETAILS:
        return (
          <CampaignDetailsScreen
            isMobile={isMobile}
            handleCtaClick={handleCtaClick}
            setShowCta={setShowCta}
            formResponses={formResponses}
            setFormResponses={setFormResponses}
          />
        );
    }
  };

  // {
  //   "correlationKey": "your_correlation_key_value",
  //   "campaignCode": "",
  //   "campaignName": "Suffering from TB need 10lakh for operation",
  //   "description": "Suffering from TB need 10lakh for operation",
  //   "status": "ACTIVE",
  //   "campaignCategory": "Education",
  //   "creatorUserCode": "150000000006",
  //   "currency": "INR",
  //   "targetAmount": 100000.00,
  //   "createdFor": "Poonam Pandey",
  //   "source": "non-ngo",
  //   "startDate": "2024-04-25",
  //   "endDate": "2025-04-25",
  //   "images": ["image_url1", "image_url2"],
  //   "supportingDocuments": ["document_url1", "document_url2"],
  //   "isActive": true,
  //   "kycDocuments": ["kyc_document_url1", "kyc_document_url2"],
  //   "relationship": {
  //     "relationType": "known",
  //     "category": "other"
  //   },
  //   "contact": {
  //     "name": "Sahil",
  //     "countryCode": "91",
  //     "phoneNumber": "8867543628"
  //   },
  //   "createdForDob": "1995-09-11"
  // }

  const getRelationType = () => {
    if (isNgo) {
      return "";
    } else {
      switch (raisingFundsCategory) {
        case "Myself":
          return "";
        case "My Family":
          return otherFamilyRelation ? otherFamilyRelation : familyRelation;
        case "My Friends":
          return friendRelation;
        case "Others":
          return otherRelation;
      }
    }
  };

  const convertImages = (data) => {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      res.push(
        "https://cimages.milaap.org/milaap/image/upload/c_fill,h_452,w_603/v1709715941/production/images/campaign/761952/eon1zt5id1zdjmolewrj_1709715964.jpg"
      );
    }
    return res;
  };

  const convertDocs = (data) => {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      res.push(
        "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0"
      );
    }
    return res;
  };

  const handleCtaClick = (isBack = false) => {
    switch (currentScreen) {
      case SCREENS.BENEFICIARY:
        setCurrentScreen(SCREENS.CAMPAIGN_DETAILS);
        break;
      case SCREENS.CAMPAIGN_DETAILS:
        if (isBack) {
          setCurrentScreen(SCREENS.BENEFICIARY);
          break;
        } else {
          //create campaign here
          createCampaign({
            campaignName: formResponses.campaignTitle,
            description: formResponses.campaignDescription,
            currency: formResponses.currency,
            campaignCategory: formResponses.campaignCategory,
            targetAmount: Number(formResponses.targetAmount),
            createdFor: beneficiaryName,
            source: isNgo ? "ngo" : "non-ngo",
            startDate: formResponses.startDate,
            endDate: formResponses.endDate,
            images: convertImages(formResponses.camapaignImages),
            supportingDocuments: convertDocs(formResponses.supportingDocs),
            kycDocuments: convertDocs(formResponses.kycDocs),
            relationship: {
              relationType: getRelationType(),
              category: raisingFundsCategory,
            },
            contact: {
              name: beneficiaryName,
              countryCode: beneficiaryPhoneInput
                ? parsePhoneNumber(beneficiaryPhoneInput).countryCallingCode
                : "",
              phoneNumber: beneficiaryPhoneInput
                ? parsePhoneNumber(beneficiaryPhoneInput).nationalNumber
                : "",
            },
            createdForDob: beneficiaryDOB ? beneficiaryDOB : null,
          })
            .then((res) => res.json())
            .then((json) => {
              if (json.success) {
                setIsOpen(false);
              }
            });
          break;
        }
    }
  };

  return (
    <>
      <Modal
        customClassName={isMobile ? mobileStyle : desktopStyle}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        showCloseButton={false}
      >
        {/* <div className={Styles.wrapper}>
        <div className={Styles.wrapper__category}>
          <span>You are raising funds for</span>
          <Dropdown
            // defaultValue={raisingFundsCategory}
            list={BENEFICIARY_CATEGORY_DROPDOWN}
            placeholder="Select Category"
            handleChange={(val) => setRaisingFundsCategory(val)}
            customClass={Styles.wrapper__category__dropdown}
          />
        </div>
        {raisingFundsCategory && getFormAccordingToCategory()} */}
        {/* <BeneficiaryScreen
        setShowCta={setShowCta}
        raisingFundsCategory={raisingFundsCategory}
        setRaisingFundsCategory={setRaisingFundsCategory}
      /> */}
        {getComponentAccordingToScreen()}
        <Button
          disabled={!showCta}
          onClick={() => handleCtaClick(false)}
          customClass={!showCta ? Styles.btnDisabled : Styles.btn}
          name="Continue"
        />
        {/* </div> */}
      </Modal>
    </>
  );
}

export default FundraiserModal;
