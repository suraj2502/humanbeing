import React, { useState } from "react";
import Styles from "./index.module.scss";
import Input from "@/Widgets/InputBox";
import Dropdown from "@/sharedComponents/Dropdown";

const GENDER_DROPDOWN_LIST = ["Male", "Female", "Non-Binary"];

function OptionalScreen() {
  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState("");

  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");

  const [gender, setGender] = useState("");

  const nameHandleBlur = () => {
    console.log("inside name handleblur");
    if (!nameInput) {
      setNameError("Full Name cannot be empty");
    } else {
      setNameError("");
    }
  };

  const emailHandleBlur = () => {
    let pattern =
      /^(?!(upgrad.learner\+)+(.)+(@upgrad1.com))(([\w-]+([\.\+]+[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?))$/i;
    if (!pattern.test(emailInput)) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };

  //   const setDropdown = (val) => {
  //     setInputState({ ...inputState, qualification });
  //     trackEditField("qualification");
  //   };

  return (
    <>
      <div className={Styles.optionalWrapper}>
        <span className={Styles.optionalWrapper__title}>
          Add Details to your Profile
        </span>
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
          />
        </div>
      </div>
    </>
  );
}

export default OptionalScreen;
