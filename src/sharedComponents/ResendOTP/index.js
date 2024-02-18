import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Styles from "./index.module.scss";

let resendInterval;

function ResendOTP({
  label,
  description,
  resendSeconds,
  className,
  onClickHandler,
}) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    handleTimer();
    return () => {
      clearInterval(resendInterval);
    };
  }, []);

  const handleTimer = () => {
    setSeconds(resendSeconds);
    clearInterval(resendInterval);
    resendInterval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) clearInterval(resendInterval);
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendTimer = () => {
    handleTimer();
    onClickHandler();
  };

  return (
    <div className={classNames(Styles.main, className)}>
      {seconds > 0 ? (
        <p className={Styles.timer}>{`${description} ${seconds} sec`}</p>
      ) : (
        <button className={Styles.otp} onClick={handleResendTimer}>
          {label}
        </button>
      )}
    </div>
  );
}

ResendOTP.defaultProps = {
  label: "Resend OTP",
  description: "Didn't recieve OTP? Resend in",
  resendSeconds: 30,
  className: "",
  onClickHandler: () => {},
};

ResendOTP.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  resendSeconds: PropTypes.number,
  className: PropTypes.string,
  onClickHandler: PropTypes.func,
};

export default ResendOTP;
