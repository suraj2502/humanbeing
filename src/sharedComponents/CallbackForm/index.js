import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import Modal from "@/Widgets/Modal";
import Input from "@/Widgets/InputBox";
import Button from "@/Widgets/Button";
// import InputBox from "@/Widgets/InputBox";

// import { PhoneInput as PhoneInputOne } from "react-international-phone";
// import "react-international-phone/style.css";

// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";

const INPUT_DATA = {
  name: {
    placeholder: "Full Name",
    error: "Invalid Full Name",
    pattern: /([^\s]*)/,
  },
  email: {
    placeholder: "Email Address",
    error: "Invalid Email",
    existingEmailError: "Email is linked with another account",
    pattern:
      /^(?!(upgrad.learner\+)+(.)+(@upgrad1.com))(([\w-]+([\.\+]+[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?))$/i,
  },
  qualification: {
    placeholder: "Highest Qualification",
  },
  phone: {
    error: "Invalid Phone Number",
  },
};

function CallbackForm({ isOpen, setIsOpen }) {
  // console.log("inside callback form");
  // const [nameInput, setNameInput] = useState("");
  // const [nameError, setNameError] = useState("");

  // const [emailInput, setEmailInput] = useState("");
  // const [emailError, setEmailError] = useState("");

  const [phoneInput, setPhoneInput] = useState();
  const [phoneError, setPhoneError] = useState("");

  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState("");

  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");

  const [disableCta, setDisableCta] = useState(true);

  // const setInput = (event) => {
  //   const { name, value } = event.target;
  //   setInputState({ ...inputState, [name]: value });
  //   trackEditField(name);
  // };

  // const nameHandleBlur = () => {
  //   if (!nameInput) {
  //     setNameError("Full Name cannot be empty");
  //   }
  // };

  // const emailHandleBlur = () => {
  //   let pattern =
  //     /^(?!(upgrad.learner\+)+(.)+(@upgrad1.com))(([\w-]+([\.\+]+[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?))$/i;
  //   if (!pattern.test(emailInput)) {
  //     setEmailError("Email is not valid");
  //   }
  // };

  // const phoneHandleBlur = () => {};

  // const getPhoneInputBox = () => {
  //   return (
  //     <InputBox
  //       value={phoneInput}
  //       onChange={(e) => setPhoneInput(e.target.value)}
  //       name="phoneInput"
  //       label="Phone Number"
  //       handleBlur={phoneHandleBlur}
  //       errorMsg={phoneError}
  //       placeholder
  //     />
  //   );
  // };

  useEffect(() => {
    if (!phoneInput || !nameInput) {
      setDisableCta(true);
    } else if (phoneError || nameError || emailError) {
      setDisableCta(true);
    } else {
      setDisableCta(false);
    }
  }, [phoneInput, phoneError, nameInput, nameError, emailError]);

  const phoneHandleBlur = () => {
    if (phoneInput) {
      if (isValidPhoneNumber(phoneInput) === false) {
        setPhoneError("Invalid Phone Number");
      } else {
        setPhoneError("");
      }
    }
  };

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
  //{"correlationKey":"d6822b78-ce95-11ee-b0fd-06ca55743989","success":true,"userCode":"123","message":"User Created SuccessFully"}

  const handleSubmit = async () => {
    if (!disableCta) {
      console.log("phoneInput", parsePhoneNumber(phoneInput));
      console.log("nameInput", nameInput);
      console.log("emailInput", emailInput);
      fetch("http://altruvo.org/api/store-visitor-data", {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
          fullName: nameInput,
          email: emailInput,
          phoneDetails: {
            countryCode: parsePhoneNumber(phoneInput).countryCallingCode,
            phoneNumber: parsePhoneNumber(phoneInput).nationalNumber,
          },
        }),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        // Converting to JSON
        .then((response) => response.json())

        // Displaying results to console
        .then((json) => console.log(json));
      setIsOpen(false);
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
      <div className={Styles.callbackformContainer}>
        <span className={Styles.title}>
          Please fill in the details below and we will reach out to you.
        </span>
        <PhoneInput
          placeholder="Enter phone number"
          value={phoneInput}
          defaultCountry="IN"
          onChange={setPhoneInput}
          onBlur={phoneHandleBlur}
          className={Styles.phoneInputCustom}
          limitMaxLength
          autoComplete="tel"
          // onFocus={}
          // style={{
          //   border: "1px solid #dfe1e6",
          //   display: "flex",
          //   padding: "0px 8px",
          //   background: "#fff",
          //   borderRadius: "8px",
          //   height: "44px",
          //   overflow: "hidden",
          //   alignItems: "center",
          // }}
          // containerStyle={{
          //   border: "10px solid black",
          // }}
          // inputStyle={{
          //   background: "lightblue",
          // }}
          // inputComponent={getPhoneInputBox}
        />
        {phoneError && <p className={Styles.error}>{phoneError}</p>}
        <Input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          name="nameInput"
          label="Full Name"
          handleBlur={nameHandleBlur}
          errorMsg={nameError}
          customClass={Styles.customInput}
        />
        <Input
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          name="emailInput"
          label="Email Address"
          handleBlur={emailHandleBlur}
          errorMsg={emailError}
          customClass={Styles.customInput}
        />
        <Button
          disabled={disableCta}
          onClick={handleSubmit}
          customClass={disableCta ? Styles.submitDisable : Styles.submit}
          name="Submit Details"
        />
      </div>
    </Modal>
  );
}

export default CallbackForm;
