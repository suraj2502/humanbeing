import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import Input from "@/Widgets/InputBox";
import Dropdown from "@/sharedComponents/Dropdown";

const GENDER_DROPDOWN_LIST = ["Male", "Female", "Non-Binary"];

function OptionalScreen({
  setShowCta,
  nameInput,
  setNameInput,
  emailInput,
  setEmailInput,
  gender,
  setGender,
  date,
  setDate,
  showTitle = true,
}) {
  // const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState("");

  // const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");

  // const [gender, setGender] = useState("");
  // const [date, setDate] = useState("");

  useEffect(() => {
    if (!emailError) {
      if (nameInput || emailInput || gender || date) {
        setShowCta(true);
      }
    } else {
      setShowCta(false);
    }
  }, [nameInput, emailInput, gender, date, emailError]);

  const nameHandleBlur = () => {
    console.log("inside name handleblur");
    // if (!nameInput) {
    //   setNameError("Full Name cannot be empty");
    // } else {
    //   setNameError("");
    // }
  };

  const emailHandleBlur = () => {
    if (!emailInput) {
      setEmailError("");
      return;
    }
    let pattern =
      /^(?!(upgrad.learner\+)+(.)+(@upgrad1.com))(([\w-]+([\.\+]+[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?))$/i;
    if (!pattern.test(emailInput)) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };

  const handleDate = (e) => {
    if (new Date().toISOString().split("T")[0] < e.target.value) {
      return;
    }
    setDate(e.target.value);
    console.log("date event", e.target.value);
  };

  //   const setDropdown = (val) => {
  //     setInputState({ ...inputState, qualification });
  //     trackEditField("qualification");
  //   };

  return (
    <>
      <div className={Styles.optionalWrapper}>
        {showTitle && (
          <span className={Styles.optionalWrapper__title}>
            Add Details to your Profile
          </span>
        )}
        <div className={Styles.optionalWrapper__inputs}>
          <Input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            name="nameInput"
            label="Full Name"
            handleBlur={nameHandleBlur}
            errorMsg={nameError}
            customClass={Styles.optionalWrapper__inputs__field}
          />
          <Input
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            name="emailInput"
            label="Email Address"
            handleBlur={emailHandleBlur}
            errorMsg={emailError}
            customClass={Styles.optionalWrapper__inputs__field}
          />
          {/* <CityState /> */}
          <Dropdown
            defaultValue={gender}
            list={GENDER_DROPDOWN_LIST}
            placeholder="Select Gender"
            handleChange={setGender}
            customClass={Styles.optionalWrapper__dropdown}
          />
          <div className={Styles.optionalWrapper__dob}>
            <label for="birthday">Date of Birth</label>
            <input
              value={date}
              max={new Date().toISOString().split("T")[0]}
              onChange={handleDate}
              type="date"
              id="birthday"
              name="birthday"
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}

export default OptionalScreen;
