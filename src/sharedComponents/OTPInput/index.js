import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Styles from "./index.module.scss";
// import useDeviceType from '../../../utils/hooks/useDeviceType';
// import logger, { LOG_TYPES } from '../../../utils/logger';

const OTP_COUNT = 4;
const ABORT_TIMER = 60;
let currentOTP = [];
let timer;

function OTPInput({
  placeholder,
  errorMsg,
  darkTheme,
  setOTP,
  validateAutoOTP,
  leftAlign = false,
  className = "",
  validateAutoOTPDelay,
}) {
  const parentRef = useRef();
  // const { isMobile } = useDeviceType();
  const [error, setError] = useState(errorMsg);

  useEffect(() => {
    setError(errorMsg);
  }, [errorMsg]);

  useEffect(() => {
    parentRef.current.querySelector("input").focus();
    // if (isMobile && 'OTPCredential' in window) autoReadOtp();

    return () => {
      currentOTP = [];
      clearTimeout(timer);
    };
  }, []);

  // const autoReadOtp = () => {
  // 	const controller = new AbortController();
  // 	timer = setTimeout(() => {
  // 		controller.abort();
  // 	}, ABORT_TIMER * 1000);

  // 	navigator.credentials
  // 		.get({
  // 			otp: { transport: ['sms'] },
  // 			signal: controller.signal,
  // 		})
  // 		.then((otp) => {
  // 			currentOTP = otp?.code?.split('');
  // 			setOTP(otp.code);
  // 			setTimeout(validateAutoOTP(true, otp?.code), validateAutoOTPDelay * 1000);
  // 		})
  // 		.catch((err) => {
  // 			logger(LOG_TYPES.ERROR, err);
  // 		});
  // };

  const updateOTP = (value, index) => {
    currentOTP[index] = value;
    setOTP(currentOTP.join(""));
  };

  const handleInput = (event, index) => {
    const { value } = event.target;
    setError("");
    if (value.length === 1) {
      const nextSibling = parentRef.current.querySelector(
        `input[name="otp-${index + 1}"]`
      );
      nextSibling?.focus();
      nextSibling?.setSelectionRange(0, 10);
    }
    updateOTP(value, index);
  };

  const handleClick = (event) => {
    event.target?.setSelectionRange(0, 10);
  };

  const handleKeydown = (event, index) => {
    // check for backspace (8) and delete (46)
    if ([8, 46].includes(event.keyCode) && event.target.value === "") {
      const previousSibling = parentRef.current.querySelector(
        `input[name="otp-${index - 1}"]`
      );
      previousSibling?.focus();
      previousSibling?.setSelectionRange(0, 10);
      event.preventDefault();
    } else if (/^[A-Za-z]$/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div
      className={classNames(
        className,
        leftAlign ? Styles.main__left : Styles.main
      )}
    >
      <div
        ref={parentRef}
        className={classNames(Styles.wrapper, {
          [Styles.error]: error,
          [Styles.darkTheme]: darkTheme,
        })}
      >
        {[...new Array(OTP_COUNT)].map((_, index) => (
          <input
            key={`otp-${index}`}
            name={`otp-${index}`}
            type="tel"
            maxLength={1}
            autoComplete="off"
            className={Styles.input}
            placeholder={placeholder[index]}
            onClick={handleClick}
            onInput={(event) => handleInput(event, index)}
            onKeyDown={(event) => handleKeydown(event, index)}
            value={currentOTP[index]}
          />
        ))}
      </div>
      {error && <span className={Styles.errorMsg}>{error}</span>}
    </div>
  );
}

OTPInput.defaultProps = {
  placeholder: "----",
  errorMsg: "",
  darkTheme: false,
  setOTP: () => {},
  validateAutoOTP: () => {},
  leftAlign: false,
  className: "",
  validateAutoOTPDelay: 0,
};

OTPInput.propTypes = {
  placeholder: PropTypes.string,
  errorMsg: PropTypes.string,
  darkTheme: PropTypes.bool,
  setOTP: PropTypes.func,
  validateAutoOTP: PropTypes.func,
  leftAlign: PropTypes.bool,
  className: PropTypes.string,
  validateAutoOTPDelay: PropTypes.number,
};

export default OTPInput;
