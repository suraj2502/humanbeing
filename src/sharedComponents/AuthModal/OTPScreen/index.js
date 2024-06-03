import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
// import { useSelector } from "react-redux";
// import { track } from "app/analytics/utils";
import Styles from "./index.module.scss";
// import ResendOTP from "../../ResendOTP";
import OTPInput from "@/sharedComponents/OTPInput";
import ResendOTP from "@/sharedComponents/ResendOTP";
import { sendOtp } from "@/services/login";
import { parsePhoneNumber } from "react-phone-number-input";
// import { resendOtp } from "../../../../apis/accounts";
// import logger, { LOG_TYPES } from "../../../../utils/logger";
// import { SINGLE_FORM_AUTH_MODAL } from "../../../../utils/strings";

const TIMER_SECONDS = 30;

const INPUT_DATA = {
  otp: {
    placeholder: "----",
    error: "Invalid OTP",
  },
};
const EDIT_ICON_URL =
  "https://ik.imagekit.io/upgrad1/marketing-platform-assets/new-images%2Fprogram-backgrounds%2Funiversity/edit_icon__1663490951300.png";

function OTPScreen({
  otp,
  setOTP,
  setShowCta,
  // handleEdit,
  phone,
  otpError,
  //   section,
  //   setAutoFocusPhone,
  handleCta,
  showToggle,
}) {
  //   const { registrationId: regId } = useSelector((state) => state.user);
  //   const editRef = useRef(false);

  const isValid = () => otp.trim() !== "" && otp.length === 4;

  useEffect(() => {
    // track(({ Accounts }) => [
    //   Accounts.modalView({
    //     screen: "OTP",
    //     actions: "single_page_form",
    //     section,
    //   }),
    //   Accounts.formScreenView({
    //     screen: "OTP",
    //     actions: "single_page_form",
    //     section,
    //   }),
    // ]);

    return () => {
      setOTP("");
    };
  }, []);

  //   useEffect(() => {
  //     if (!editRef.current) {
  //       track(({ Accounts }) =>
  //         Accounts.minimalEdit({
  //           screen: "OTP",
  //           section,
  //           field__label: "otp",
  //           actions: "single_page_form",
  //         })
  //       );
  //       editRef.current = true;
  //     }
  //   }, [otp]);

  useEffect(() => {
    if (isValid()) {
      console.log("otp", otp);
      setShowCta(true);
      //   track(({ Accounts }) =>
      //     Accounts.activeButtonTransformation({
      //       screen: "OTP",
      //       section,
      //       actions: "single_page_form",
      //     })
      //   );
    } else {
      setShowCta(false);
    }
  }, [otp]);

  const handleEditWrapper = () => {
    setAutoFocusPhone(true);
    handleEdit(false);
  };

  const handleResendOTP = () => {
    sendOtp({
      phoneNumber: parsePhoneNumber(phone).nationalNumber,
      countryCode: parsePhoneNumber(phone).countryCallingCode,
      isLogin: true,
      isNgo: showToggle,
    });
    // track(({ Accounts }) =>
    //   Accounts.resendOtpClicked({
    //     screen: "OTP",
    //     actions: "single_page_form",
    //     section,
    //   })
    // );
    // resendOtp(regId).catch((err) => {
    //   logger(LOG_TYPES.ERROR, err);
    // });
    console.log("resend otp clicked");
  };

  // const handleEditPhone = () => {

  // }

  return (
    <>
      <div className={Styles.otpWrapper}>
        <span className={Styles.otpWrapper__title}>{"We've sent an OTP on"}</span>
        <div className={Styles.otpWrapper__editContainer}>
          <span className={Styles.otpWrapper__editContainer__phone}>
            {phone}
          </span>
          <p onClick={() => handleCta(true)}>Edit</p>
        </div>
        <OTPInput
          leftAlign
          showSendButton={false}
          errorMsg={otpError}
          placeholder={INPUT_DATA.otp.placeholder}
          setOTP={setOTP}
          validateAutoOTP={handleCta}
          className={Styles.otpInput}
          validateAutoOTPDelay={2}
        />
        <ResendOTP
          // label={SINGLE_FORM_AUTH_MODAL.OTP_SCREEN.RESEND_CTA_TEXT}
          // description={SINGLE_FORM_AUTH_MODAL.OTP_SCREEN.RESEND_TEXT}
          resendSeconds={TIMER_SECONDS}
          className={Styles.otpWrapper__resendOtp}
          onClickHandler={handleResendOTP}
        />
      </div>
    </>
  );
}

OTPScreen.propTypes = {
  otp: PropTypes.string,
  setOTP: PropTypes.func,
  //   phone: PropTypes.string,
  //   handleEdit: PropTypes.func,
  setShowCta: PropTypes.func,
  otpError: PropTypes.string,
  //   section: PropTypes.string,
  //   setAutoFocusPhone: PropTypes.func,
  handleCta: PropTypes.func,
};

export default OTPScreen;
