import React, { useEffect, useState } from "react";
import Modal from "@/Widgets/Modal";
import Styles from "./index.module.scss";
import Button from "@/Widgets/Button";
// import cx from "classnames";
import OTPScreen from "./OTPScreen";
import PhoneScreen from "./PhoneScreen";
import OptionalScreen from "./OptionalScreen";
import Toast from "../Toast";

import "react-phone-number-input/style.css";
import { parsePhoneNumber } from "react-phone-number-input";
import NGODetailsScreen from "./NGODetailsScreen";
import {
  createNgoUser,
  getUserByPhone,
  getUserDetails,
  sendOtp,
  updateRegisteredUserDetails,
  verifyOtp,
} from "@/services/login";
import { handleLoginCookie } from "@/utils/postAuthentication";
import { splitFullName } from "@/utils/name";

const SCREENS = {
  PHONE_NUMBER: "PHONE_NUMBER",
  OTP: "OTP",
  OPTIONAL: "OPTIONAL",
  NGO_DETAILS: "NGO_DETAILS",
};

const desktopStyle = {
  background: "white",
  borderRadius: 10,
  height: "80%",
  width: "auto",
  padding: "0px",
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
};

const MASTER_OTP = "1234";

function AuthModal({ isOpen, setIsOpen, isMobile, showCloseButton = true }) {
  console.log("isMobile authModal", isMobile);
  const [otpError, setOTPError] = useState("");
  const [otp, setOTP] = useState("");
  const [phoneInput, setPhoneInput] = useState();
  const [disableCta, setDisableCta] = useState(true);
  const [currentScreen, setCurrentScreen] = useState(SCREENS.PHONE_NUMBER);
  const [showToast, setShowToast] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [rootError, setRootError] = useState("");

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const [details, setDetails] = useState({
    orgName: "",
    website: "",
    state: "", //
    city: "", //
    fullName: "",
    gender: "",
    designation: "",
    email: "",
    registeredAddress: "",
    registrationCategory: "",
    previousYearIncome: null,
    previousYearExpenditure: null,
    registrationNumber80G: "",
    registrationNumber12A: "",
    pan: "",
    tan: "",
    causesSupported: [],
  });

  const [errors, setErrors] = useState({
    orgName: "",
    website: "",
    state: "",
    city: "",
    fullName: "",
    gender: "",
    designation: "",
    email: "",
    registeredAddress: "",
    registrationCategory: "",
    previousYearIncome: "",
    previousYearExpenditure: "",
    registrationNumber80G: "",
    registrationNumber12A: "",
    pan: "",
    tan: "",
    causesSupported: "",
  });

  useEffect(() => {
    setRootError("");
  }, [currentScreen]);

  const handlePhoneNumber = () => {
    console.log("handlePhoneNumber", parsePhoneNumber(phoneInput));
    if (showToggle) {
      getUserByPhone({
        phoneNumber: parsePhoneNumber(phoneInput).nationalNumber,
        countryCode: parsePhoneNumber(phoneInput).countryCallingCode,
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success) {
            if (!json.isNgo) {
              setRootError(
                "This number is already associated with a personal account"
              );
            } else {
              setCurrentScreen(SCREENS.OTP);
            }
          } else {
            setCurrentScreen(SCREENS.NGO_DETAILS);
          }
        });
      // setCurrentScreen(SCREENS.NGO_DETAILS);
    } else {
      sendOtp({
        phoneNumber: parsePhoneNumber(phoneInput).nationalNumber,
        countryCode: parsePhoneNumber(phoneInput).countryCallingCode,
        isLogin: true,
        isNgo: showToggle,
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success) {
            if (json.isNgo) {
              setRootError(
                "This number is already associated with a NGO account"
              );
            } else {
              setRootError("");
              setCurrentScreen(SCREENS.OTP);
            }
          } else {
            setRootError("Something Went Wrong, try again!!");
          }
        });
    }
    setDisableCta(true);
  };

  const handleCtaClick = (isBack = false) => {
    console.log("handleCtaClick", isBack, currentScreen);
    switch (currentScreen) {
      case SCREENS.PHONE_NUMBER:
        handlePhoneNumber();
        break;
      case SCREENS.NGO_DETAILS:
        //Register NGO API Call
        const splittedName = splitFullName(details.fullName);
        createNgoUser({
          organisationName: details.orgName,
          mission: details.causesSupported,
          contact: {
            firstName: splittedName.firstName || "",
            middleName: splittedName.middleName || "",
            lastName: splittedName.lastName || "",
            email: details.email,
            gender: details.gender,
            phoneDetail: {
              phoneNumber: parsePhoneNumber(phoneInput).nationalNumber,
              countryCode: parsePhoneNumber(phoneInput).countryCallingCode,
            },
            roleInOrganization: details.designation,
          },
          registeredAddress: details.registeredAddress,
          country: "",
          state: "",
          city: "",
          zipCode: "",
          registrationNumber: details.registrationNumber80G,
          registrationOfNgoAs: details.registrationCategory,
          is80GCertified: true,
          certificateNumber12A: details.registrationNumber12A,
          panNumber: details.pan,
          tanNumber: details.tan,
          websiteUrl: details.website,
          lastFinancialYearIncome: Number(details.previousYearIncome),
          lastFinancialYearExpenditure: Number(details.previousYearExpenditure),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.success) {
              setRootError("");
              setCurrentScreen(SCREENS.OTP);
            } else {
              setRootError(
                "Oops Something went wrong, try again after sometime!"
              );
            }
          });
        break;
      case SCREENS.OTP:
        if (isBack) {
          setCurrentScreen(SCREENS.PHONE_NUMBER);
        } else {
          getUserByPhone({
            phoneNumber: parsePhoneNumber(phoneInput).nationalNumber,
            countryCode: parsePhoneNumber(phoneInput).countryCallingCode,
          })
            .then((responseUserByPhone) => responseUserByPhone.json())
            .then((jsonUserByPhone) => {
              let isNewUser = true;
              // if (jsonUserByPhone.success) {
              //   isNewUser = false;
              // }
              verifyOtp({
                phoneNumber: parsePhoneNumber(phoneInput).nationalNumber,
                countryCode: parsePhoneNumber(phoneInput).countryCallingCode,
                isLogin: true,
                otp: otp,
              })
                .then((response) => response.json())
                .then((json) => {
                  console.log("verify otp api log", json);
                  if (json.success) {
                    console.log("correct otp");
                    handleLoginCookie(json.userCode, json.token, showToggle);
                    if (showToggle) {
                      setShowToast(true);
                      setIsOpen(false);
                      setTimeout(() => {
                        setShowToast(false);
                      }, 3000);
                    } else {
                      if (isNewUser) {
                        setShowToast(true);
                        setDisableCta(true);
                        setShowSkip(true);
                        setCurrentScreen(SCREENS.OPTIONAL);
                        setTimeout(() => {
                          setShowToast(false);
                        }, 3000);
                      } else {
                        setIsOpen(false);
                      }
                    }
                  } else {
                    setOTPError("Invalid OTP");
                  }
                });
            });
        }
        break;
      case SCREENS.OPTIONAL:
        //call API
        const splittedNameOptionalScreen = splitFullName(nameInput);
        updateRegisteredUserDetails({
          firstName: splittedNameOptionalScreen.firstName,
          lastName: splittedNameOptionalScreen.lastName,
          email: emailInput ? emailInput : null,
          phoneDetail: {
            phoneNumber: parsePhoneNumber(phoneInput).nationalNumber,
            countryCode: parsePhoneNumber(phoneInput).countryCallingCode,
          },
          birthDate: date ? date : null,
          isNgo: showToggle,
          gender: gender ? gender : null,
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.success) {
              setIsOpen(false);
            } else {
              setRootError(
                "Oops Something went wrong, try again after sometime!"
              );
            }
          });
    }
  };

  const setShowCta = (val) => {
    setDisableCta(!val);
  };

  const componentToRender = () => {
    switch (currentScreen) {
      case SCREENS.PHONE_NUMBER:
        return (
          <PhoneScreen
            phoneInput={phoneInput}
            setPhoneInput={setPhoneInput}
            setDisableCta={setDisableCta}
            showToggle={showToggle}
            setShowToggle={setShowToggle}
          />
        );
      case SCREENS.NGO_DETAILS:
        return (
          <NGODetailsScreen
            details={details}
            setDetails={setDetails}
            errors={errors}
            setErrors={setErrors}
            setShowCta={setShowCta}
          />
        );
      case SCREENS.OTP:
        return (
          <OTPScreen
            // setAutoFocusPhone={setAutoFocusPhone}
            otpError={otpError}
            setOTPError={setOTPError}
            otp={otp}
            setOTP={setOTP}
            phone={phoneInput}
            showToggle={showToggle}
            // handleEdit={handleCta}
            setShowCta={setShowCta}
            // section={section}
            handleCta={handleCtaClick}
          />
        );
      case SCREENS.OPTIONAL:
        return (
          <OptionalScreen
            nameInput={nameInput}
            setNameInput={setNameInput}
            emailInput={emailInput}
            setEmailInput={setEmailInput}
            date={date}
            setDate={setDate}
            gender={gender}
            setGender={setGender}
            setShowCta={setShowCta}
          />
        );
    }
  };

  return (
    <>
      {showToast && <Toast title="Account Created Successfully!!" />}
      <Modal
        customClassName={isMobile ? mobileStyle : desktopStyle}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        showCloseButton={showCloseButton}
      >
        <div className={Styles.authModal}>
          {!isMobile && <div className={Styles.authModal__imgWrapper}></div>}
          <div className={Styles.authModal__formWrapper}>
            {componentToRender()}
            <Button
              disabled={disableCta}
              onClick={() => handleCtaClick(false)}
              customClass={
                disableCta
                  ? Styles["authModal__formWrapper__btn--disabled"]
                  : Styles.authModal__formWrapper__btn
              }
              name="Continue"
            />
            <span
              onClick={() => setIsOpen(false)}
              className={
                showSkip
                  ? Styles.authModal__formWrapper__skip
                  : Styles["authModal__formWrapper__skip--hidden"]
              }
            >
              Skip
            </span>
            {rootError && (
              <span className={Styles.authModal__formWrapper__error}>
                {rootError}
              </span>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AuthModal;
