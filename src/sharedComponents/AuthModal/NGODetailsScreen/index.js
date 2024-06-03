import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import Input from "@/Widgets/InputBox";
import Dropdown from "@/sharedComponents/Dropdown";
import Badges from "@/Widgets/Badges";

const GENDER_DROPDOWN_LIST = ["Male", "Female", "Non-Binary"];

const NGO_CATEGORY_LIST = ["Society", "Trust", "Companies Act", "Others"];

const CAUSES_LIST = [
  "Health",
  "Education",
  " Environment",
  "Disaster",
  "Others",
];

function NGODetailsScreen({
  setShowCta,
  details,
  setDetails,
  errors,
  setErrors,
}) {
  // const [details, setDetails] = useState({
  //   orgName: "",
  //   website: "",
  //   state: "", //
  //   city: "", //
  //   fullName: "",
  //   gender: "",
  //   designation: "",
  //   email: "",
  //   registeredAddress: "",
  //   registrationCategory: "",
  //   previousYearIncome: null,
  //   previousYearExpenditure: null,
  //   registrationNumber80G: "",
  //   registrationNumber12A: "",
  //   pan: "",
  //   tan: "",
  //   causesSupported: [],
  // });

  // const [errors, setErrors] = useState({
  //   orgName: "",
  //   website: "",
  //   state: "",
  //   city: "",
  //   fullName: "",
  //   gender: "",
  //   designation: "",
  //   email: "",
  //   registeredAddress: "",
  //   registrationCategory: "",
  //   previousYearIncome: "",
  //   previousYearExpenditure: "",
  //   registrationNumber80G: "",
  //   registrationNumber12A: "",
  //   pan: "",
  //   tan: "",
  //   causesSupported: "",
  // });

  const emptyHandleBlur = (key) => {
    console.log("inside name handleblur");
    console.log("details.key", details[key]);
    if (!details[key]) {
      setErrors({ ...errors, [key]: "Field cannot be empty" });
    } else {
      setErrors({ ...errors, [key]: "" });
    }
  };

  useEffect(() => {
    if (
      details.orgName &&
      details.website &&
      details.fullName &&
      details.gender &&
      details.email &&
      details.registeredAddress &&
      details.registrationCategory &&
      details.previousYearIncome &&
      details.previousYearExpenditure &&
      details.registrationNumber80G &&
      details.registrationNumber12A &&
      details.pan &&
      details.tan &&
      details.causesSupported &&
      details.causesSupported.length > 0
    ) {
      setShowCta(true);
    } else {
      setShowCta(false);
    }
  }, [details]);

  console.log("details", details);

  return (
    <>
      <div className={Styles.wrapper}>
        <span className={Styles.wrapper__title}>
          Please fill the form below to register with us
        </span>
        <div className={Styles.wrapper__inputs}>
          <Input
            value={details.orgName}
            onChange={(e) =>
              setDetails({ ...details, orgName: e.target.value })
            }
            name="nameInput"
            label="Organisation Name"
            handleBlur={() => emptyHandleBlur("orgName")}
            errorMsg={errors.orgName}
            customClass={Styles.wrapper__inputs__field}
          />
          <Input
            value={details.website}
            onChange={(e) =>
              setDetails({ ...details, website: e.target.value })
            }
            name="websiteInput"
            label="Website URL"
            handleBlur={() => emptyHandleBlur("website")}
            errorMsg={errors.website}
            customClass={Styles.wrapper__inputs__field}
          />
          <Input
            value={details.fullName}
            onChange={(e) =>
              setDetails({ ...details, fullName: e.target.value })
            }
            name="fullName"
            label="Full Name"
            handleBlur={() => emptyHandleBlur("fullName")}
            errorMsg={errors.fullName}
            customClass={Styles.wrapper__inputs__field}
          />
          <Dropdown
            defaultValue={details.gender}
            list={GENDER_DROPDOWN_LIST}
            placeholder="Select Gender"
            handleChange={(val) => setDetails({ ...details, gender: val })}
            customClass={Styles.wrapper__inputs__dropdown}
          />
          <Input
            value={details.designation}
            onChange={(e) =>
              setDetails({ ...details, designation: e.target.value })
            }
            name="designation"
            label="Designation"
            handleBlur={() => emptyHandleBlur("designation")}
            errorMsg={errors.designation}
            customClass={Styles.wrapper__inputs__field}
          />
          <Input
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            name="email"
            label="Email Address"
            handleBlur={() => emptyHandleBlur("email")}
            errorMsg={errors.email}
            customClass={Styles.wrapper__inputs__field}
          />
          <Input
            isLongInput
            value={details.registeredAddress}
            onChange={(e) =>
              setDetails({ ...details, registeredAddress: e.target.value })
            }
            name="address"
            label="Registered Address"
            handleBlur={() => emptyHandleBlur("registeredAddress")}
            errorMsg={errors.registeredAddress}
            customClass={Styles.wrapper__inputs__field}
          />
          <Dropdown
            defaultValue={details.registrationCategory}
            list={NGO_CATEGORY_LIST}
            placeholder="Select NGO Category"
            handleChange={(val) =>
              setDetails({ ...details, registrationCategory: val })
            }
            customClass={Styles.wrapper__inputs__dropdown}
          />
          <Input
            type="number"
            min={0}
            value={details.previousYearIncome}
            onChange={(e) =>
              setDetails({ ...details, previousYearIncome: e.target.value })
            }
            name="previousYearIncome"
            label="Previous Year Income (INR)"
            handleBlur={() => emptyHandleBlur("previousYearIncome")}
            errorMsg={errors.previousYearIncome}
            customClass={Styles.wrapper__inputs__field}
          />
          <Input
            type="number"
            min={0}
            value={details.previousYearExpenditure}
            onChange={(e) =>
              setDetails({
                ...details,
                previousYearExpenditure: e.target.value,
              })
            }
            name="previousYearExpenditure"
            label="Previous Year Expenditure (INR)"
            handleBlur={() => emptyHandleBlur("previousYearExpenditure")}
            errorMsg={errors.previousYearExpenditure}
            customClass={Styles.wrapper__inputs__field}
          />
          <Input
            value={details.registrationNumber80G}
            onChange={(e) =>
              setDetails({ ...details, registrationNumber80G: e.target.value })
            }
            name="registrationNumber80G"
            label="80G Registration Number"
            handleBlur={() => emptyHandleBlur("registrationNumber80G")}
            errorMsg={errors.registrationNumber80G}
            customClass={Styles.wrapper__inputs__field}
          />
          <Input
            value={details.registrationNumber12A}
            onChange={(e) =>
              setDetails({ ...details, registrationNumber12A: e.target.value })
            }
            name="registrationNumber12A"
            label="12A Registration Number"
            handleBlur={() => emptyHandleBlur("registrationNumber12A")}
            errorMsg={errors.registrationNumber12A}
            customClass={Styles.wrapper__inputs__field}
          />
          <Input
            value={details.pan}
            onChange={(e) => setDetails({ ...details, pan: e.target.value })}
            name="pan"
            label="PAN"
            handleBlur={() => emptyHandleBlur("pan")}
            errorMsg={errors.pan}
            customClass={Styles.wrapper__inputs__field}
          />
          <Input
            value={details.tan}
            onChange={(e) => setDetails({ ...details, tan: e.target.value })}
            name="tan"
            label="TAN"
            handleBlur={() => emptyHandleBlur("tan")}
            errorMsg={errors.tan}
            customClass={Styles.wrapper__inputs__field}
          />
          <div className={Styles.wrapper__inputs__badgesList}>
            <span>
              Please select the causes you support from the below options:
            </span>
            {CAUSES_LIST.map((item) => {
              return (
                <Badges
                  handleClick={(val) =>
                    setDetails({
                      ...details,
                      causesSupported: [...details.causesSupported, val],
                    })
                  }
                  name={item}
                  key={item}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default NGODetailsScreen;
