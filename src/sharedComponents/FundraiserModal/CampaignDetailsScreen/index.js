import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import BackArrow from "@/assets/icons/BackArrow";
import Input from "@/Widgets/InputBox";
import Dropdown from "@/sharedComponents/Dropdown";
import FileUploader from "@/sharedComponents/FileUploader";

const CURRENCY_DROPDOWN = ["INR", "USD"];

const CAMPAIGN_CATEGORY_LIST = ["Education", "Health", "Other"];

function CampaignDetailsScreen({
  setShowCta,
  handleCtaClick,
  isMobile,
  formResponses,
  setFormResponses,
}) {
  // const [formResponses, setFormResponses] = useState({
  //   campaignTitle: "",
  //   campaignDescription: "",
  //   camapaignImages: [],
  //   currency: "",
  //   targetAmount: null,
  //   supportingDocs: [],
  //   startDate: new Date().toISOString().split("T")[0],
  //   endDate: "",
  //   kycDocs: [],
  // });

  const [formResponsesError, setFormResponsesError] = useState({
    campaignTitle: "",
    campaignDescription: "",
    camapaignImages: "",
    currency: "",
    targetAmount: "",
    supportingDocs: "",
    startDate: "",
    endDate: "",
    kycDocs: "",
  });

  const handleBackClick = () => {
    console.log("back pressed");
    handleCtaClick(true);
  };

  const emptyHandleBlur = (key) => {
    if (!formResponses[key]) {
      setFormResponsesError({
        ...formResponsesError,
        [key]: "Field cannot be empty",
      });
    } else {
      setFormResponsesError({ ...formResponsesError, [key]: "" });
    }

    if (key == "targetAmount") {
      if (formResponses[key] < 1000) {
        setFormResponsesError({
          ...formResponsesError,
          [key]: "Value cannot be less than 1000",
        });
      }
    }
  };

  useEffect(() => {
    if (
      formResponses.campaignTitle &&
      formResponses.campaignDescription &&
      formResponses.currency &&
      formResponses.targetAmount &&
      formResponses.startDate &&
      formResponses.endDate &&
      formResponses.camapaignImages &&
      formResponses.camapaignImages.length > 0 &&
      formResponses.supportingDocs &&
      formResponses.supportingDocs.length > 0 &&
      formResponses.campaignCategory
      // formResponses.kycDocs &&
      // formResponses.kycDocs.length > 0
    ) {
      if (formResponsesError.targetAmount) {
        setShowCta(false);
      } else {
        setShowCta(true);
      }
    } else {
      setShowCta(false);
    }
  }, [formResponses, formResponsesError]);

  //   const handleBlur = () => {
  //     if (!campaignTitle) {
  //       setCampaignTitleError("Field cannot be empty");
  //     } else {
  //       setCampaignTitleError("");
  //     }
  //   };

  //   <Input
  //             value={details.orgName}
  //             onChange={(e) =>
  //               setDetails({ ...details, orgName: e.target.value })
  //             }
  //             name="nameInput"
  //             label="Organisation Name"
  //             handleBlur={() => emptyHandleBlur("orgName")}
  //             errorMsg={errors.orgName}
  //             customClass={Styles.wrapper__inputs__field}
  //           />

  //   <Input
  //             type="number"
  //             min={0}
  //             value={details.previousYearIncome}
  //             onChange={(e) =>
  //               setDetails({ ...details, previousYearIncome: e.target.value })
  //             }
  //             name="previousYearIncome"
  //             label="Previous Year Income (INR)"
  //             handleBlur={() => emptyHandleBlur("previousYearIncome")}
  //             errorMsg={errors.previousYearIncome}
  //             customClass={Styles.wrapper__inputs__field}
  //           />

  const handleDate = (e, key) => {
    if (key == "startDate") {
      if (new Date().toISOString().split("T")[0] > e.target.value) {
        return;
      }
      setFormResponses({ ...formResponses, startDate: e.target.value });
    }
    if (key == "endDate") {
      if (
        addOneDayToDate(new Date(formResponses.startDate))
          .toISOString()
          .split("T")[0] > e.target.value
      ) {
        return;
      }
      setFormResponses({ ...formResponses, endDate: e.target.value });
    }
    // if(key == "endDate")
    // {
    //     if()
    // }
    // setFormResponses({ ...formResponses, key: e.target.value });
    // setBeneficiaryDOB(e.target.value);
    console.log("date event", e.target.value);
  };

  const addOneDayToDate = (date) => {
    date.setDate(date.getDate() + 1);

    return date;
  };

  console.log("form responses", formResponses);

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.wrapper__header}>
        <BackArrow onClick={handleBackClick} />
        <span>Please complete the last step to create your campaign</span>
      </div>
      <div className={Styles.wrapper__form}>
        <Input
          value={formResponses.campaignTitle}
          onChange={(e) =>
            setFormResponses({
              ...formResponses,
              campaignTitle: e.target.value,
            })
          }
          name="campaignTitle"
          label="Campaign Title"
          handleBlur={() => emptyHandleBlur("campaignTitle")}
          errorMsg={formResponsesError.campaignTitle}
          customClass={Styles.wrapper__form__input}
        />
        <Input
          isLongInput
          value={formResponses.campaignDescription}
          onChange={(e) =>
            setFormResponses({
              ...formResponses,
              campaignDescription: e.target.value,
            })
          }
          name="campaignDescription"
          label="Campaign Description"
          handleBlur={() => emptyHandleBlur("campaignDescription")}
          errorMsg={formResponsesError.campaignDescription}
          customClass={Styles.wrapper__form__input}
        />
        <Dropdown
          defaultValue={formResponses.campaignCategory}
          list={CAMPAIGN_CATEGORY_LIST}
          placeholder="Campaign Category"
          handleChange={(val) =>
            setFormResponses({ ...formResponses, campaignCategory: val })
          }
          customClass={Styles.wrapper__form__dropdownCategory}
        />
        {isMobile ? (
          <>
            <Dropdown
              // defaultValue={raisingFundsCategory}
              list={CURRENCY_DROPDOWN}
              placeholder="Currency"
              handleChange={(val) =>
                setFormResponses({ ...formResponses, currency: val })
              }
              customClass={Styles.wrapper__form__multirow__dropdown}
            />
            <Input
              type="number"
              min={1000}
              value={formResponses.targetAmount}
              onChange={(e) =>
                setFormResponses({
                  ...formResponses,
                  targetAmount: e.target.value,
                })
              }
              name="targetAmount"
              label="Target Amount"
              handleBlur={() => emptyHandleBlur("targetAmount")}
              errorMsg={formResponsesError.targetAmount}
              customClass={Styles.wrapper__form__multirow__input}
            />
          </>
        ) : (
          <div className={Styles.wrapper__form__multirow}>
            <Dropdown
              // defaultValue={raisingFundsCategory}
              list={CURRENCY_DROPDOWN}
              placeholder="Currency"
              handleChange={(val) =>
                setFormResponses({ ...formResponses, currency: val })
              }
              customClass={Styles.wrapper__form__multirow__dropdown}
            />
            <Input
              type="number"
              min={1000}
              value={formResponses.targetAmount}
              onChange={(e) =>
                setFormResponses({
                  ...formResponses,
                  targetAmount: e.target.value,
                })
              }
              name="targetAmount"
              label="Target Amount"
              handleBlur={() => emptyHandleBlur("targetAmount")}
              errorMsg={formResponsesError.targetAmount}
              customClass={Styles.wrapper__form__multirow__input}
            />
          </div>
        )}
        {/* <div className={Styles.wrapper__form__multirow}>
          <Dropdown
            // defaultValue={raisingFundsCategory}
            list={CURRENCY_DROPDOWN}
            placeholder="Currency"
            handleChange={(val) =>
              setFormResponses({ ...formResponses, currency: val })
            }
            customClass={Styles.wrapper__form__multirow__dropdown}
          />
          <Input
            type="number"
            min={1000}
            value={formResponses.targetAmount}
            onChange={(e) =>
              setFormResponses({
                ...formResponses,
                targetAmount: e.target.value,
              })
            }
            name="targetAmount"
            label="Target Amount"
            handleBlur={() => emptyHandleBlur("targetAmount")}
            errorMsg={formResponsesError.targetAmount}
            customClass={Styles.wrapper__form__multirow__input}
          />
        </div> */}
        <div className={Styles.wrapper__form__multirow}>
          <div className={Styles.wrapper__form__multirow__date}>
            <label for="startDate">Campaign Start Date:</label>
            <input
              value={formResponses.startDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => handleDate(e, "startDate")}
              type="date"
              id="startDate"
              name="startDate"
            ></input>
          </div>
          <div className={Styles.wrapper__form__multirow__date}>
            <label for="endDate">Campaign End Date:</label>
            <input
              value={formResponses.endDate}
              min={
                addOneDayToDate(new Date(formResponses.startDate))
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) => handleDate(e, "endDate")}
              type="date"
              id="endDate"
              name="endDate"
            ></input>
          </div>
        </div>
        <div className={Styles.wrapper__form__files}>
          <FileUploader
            title="Upload Supporting Documents for this campaign (Eg - Doctor's Prescription, Bills etc.)"
            files={formResponses.supportingDocs}
            setFiles={(val) =>
              setFormResponses({ ...formResponses, supportingDocs: val })
            }
          />
        </div>
        <div className={Styles.wrapper__form__files}>
          <FileUploader
            title="Upload KYC Documents of the beneficiary (Aadhar/Driving License/Passport)"
            files={formResponses.kycDocs}
            setFiles={(val) =>
              setFormResponses({ ...formResponses, kycDocs: val })
            }
          />
        </div>
        <div className={Styles.wrapper__form__files}>
          <FileUploader
            title="Upload images for campaign (minimum one)"
            files={formResponses.camapaignImages}
            setFiles={(val) =>
              setFormResponses({ ...formResponses, camapaignImages: val })
            }
          />
        </div>
        {/* <div className={Styles.wrapper__form__multirow}>
          
        </div> */}
      </div>
    </div>
  );
}

export default CampaignDetailsScreen;
