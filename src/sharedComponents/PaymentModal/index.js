import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import Modal from "@/Widgets/Modal";
import Dropdown from "../Dropdown";
import Input from "@/Widgets/InputBox";
import PhoneInputCommon from "../PhoneInput";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import Button from "@/Widgets/Button";
import { createPaymentSession, getAmountBreakup } from "@/services/payment";
import Checkbox from "../Checkbox";
// import Razorpay from "razorpay";

const desktopStyles = {
  background: "white",
  border: "none",
  height: "fit-content",
  transform: "translate(-50%, -50%)",
  position: "absolute",
  left: "50%",
  top: "50%",
  padding: "10px 20px",
  width: "720px",
  borderRadius: "16px",
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

const CURRENCY_DROPDOWN = ["INR"];
const TIP_DROPDOWN = ["18%", "10%", "5%", "Other"];

let rzp = {};

function PaymentModal({
  isPaymentModalOpen,
  setIsPaymentModalOpen,
  isMobile,
  userData,
  campaignCode,
}) {
  const getName = () => {
    let res = "";
    if (userData.firstName) {
      res = userData.firstName;
    }
    if (userData.lastName) {
      res = res + " " + userData.lastName;
    }
    return res;
  };

  const [currency, setCurrency] = useState(CURRENCY_DROPDOWN[0]);
  const [donationAmount, setDonationAmount] = useState(10);
  const [tipPercent, setTipPercent] = useState(TIP_DROPDOWN[0]);
  const [tipAmount, setTipAmount] = useState(180);
  const [showManualTip, setShowManualTip] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  console.log("userData payment modal", userData);

  const [nameInput, setNameInput] = useState(
    getName()?.length > 0 ? getName() : ""
  );
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailInput, setEmailInput] = useState(
    userData?.email ? userData?.email : ""
  );
  const [phoneError, setPhoneError] = useState("");
  const [phoneInput, setPhoneInput] = useState(
    userData?.phoneNumber ? `+${userData.phoneNumber}` : null
  );

  const [ctaDisable, setCtaDisable] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;
    script.crossOrigin = "anonymous";

    document.body.appendChild(script);

    return () => {
      // clean up the script when the component in unmounted
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (tipPercent != "Other") {
      const number = parseFloat(tipPercent.replace("%", ""));
      setTipAmount(Math.ceil((number / 100) * donationAmount));
    }

    if (tipPercent == "Other") {
      setShowManualTip(true);
    } else {
      setShowManualTip(false);
    }
  }, [donationAmount, tipPercent]);

  const phoneHandleBlur = () => {
    if (phoneInput) {
      if (isValidPhoneNumber(phoneInput) === false) {
        setPhoneError("Invalid Phone Number");
      }
    }
  };

  const nameHandleBlur = () => {
    if (!nameInput) {
      setNameError("Full Name cannot be empty");
    } else {
      setNameError("");
    }
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

  useEffect(() => {
    if (phoneInput) {
      if (isValidPhoneNumber(phoneInput)) {
        // setDisableCta(false);
        setPhoneError("");
      } else {
        // setDisableCta(true);
      }
    } else {
      //   setDisableCta(true);
    }
  }, [phoneInput]);

  const handlePayment = () => {
    console.log("inside payment btn click");
    getAmountBreakup(donationAmount)
      .then((res) => res.json())
      .then((json) => {
        console.log("breakup details", json);
        if (json.success) {
          // setUserData(json.ngoUserDetail);
          let obj = {
            donation_amount: Number(donationAmount),
            campaign_code: campaignCode,
            currency: "INR",
            want_80G_certificate: false,
            is_anonymous: isChecked,
            tip_amount: Number(tipAmount),
            donation_amount_breakup: json.donation_amount_breakup,
            total_amount_to_pay: Number(donationAmount) + Number(tipAmount),
            donor_phone_number: phoneInput,
            donor_email: emailInput,
            donor_name: nameInput,
          };
          createPaymentSession(obj)
            .then((res) => res.json())
            .then((json) => {
              if (json.success) {
                var rzp = new Razorpay({
                  // key_id: "rzp_test_to6gbD9Ewjaa4E",
                  // key_secret: "Z8HT54oL5n42MtrUHRZKTskp",
                  key_id: "rzp_live_G5N02p8antGrkC",
                  key_secret: "uPKJGp2dDsNR0i9P0yNzTyNE",
                  order_id: json.order_id,
                  callback_url:
                    "https://altruvo.org/api/payment/update-payment-callback",
                  prefill: {
                    name: nameInput,
                    email: emailInput,
                    contact: phoneInput,
                  },
                });
                rzp.open();
                // setIsOpen(false);
                // window.location.reload();
                console.log("payment session id", json);
              } else {
                // setEditProfileError("Oops! Something went wrong!");
              }
            });
        } else {
          // window.location.href = "/500";
        }
      });
  };

  useEffect(() => {
    if (!phoneError) {
      if (phoneInput && nameInput && emailInput) {
        setCtaDisable(false);
      } else {
        setCtaDisable(true);
      }
    } else {
      setCtaDisable(true);
    }
  }, [phoneInput, phoneError, nameInput, emailInput]);

  return (
    <Modal
      isOpen={isPaymentModalOpen}
      showCloseButton={isPaymentModalOpen}
      modalName="payment"
      closeModal={() => setIsPaymentModalOpen(false)}
      customClassName={isMobile ? mobileStyle : desktopStyles}
    >
      <h3>Payment Form</h3>
      <div className={Styles.amountContainer}>
        <Dropdown
          defaultValue={CURRENCY_DROPDOWN[0]}
          list={CURRENCY_DROPDOWN}
          placeholder="Currency"
          handleChange={(val) => setCurrency(val)}
          customClass={Styles.amountContainer__dropdown}
        />
        <Input
          type="number"
          min={100}
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          name="donationAmount"
          label="Donation Amount"
          //   handleBlur={() => emptyHandleBlur("targetAmount")}
          //   errorMsg={formResponsesError.targetAmount}
          customClass={Styles.amountContainer__input}
        />
      </div>
      <div className={Styles.tipContainer}>
        <p>
          Altruvo is waiving its platform fees for this fundraiser, so 100% of
          your donation goes directly to the cause. We rely on the generosity of
          donors like you to make this possible.
        </p>
        <div className={Styles.tipContainer__inner}>
          <span>Select tip percent</span>
          <Dropdown
            defaultValue={TIP_DROPDOWN[0]}
            list={TIP_DROPDOWN}
            placeholder=""
            handleChange={(val) => setTipPercent(val)}
            customClass={Styles.tipContainer__inner__dropdown}
          />
          {showManualTip && (
            <input
              type="number"
              value={tipAmount}
              onChange={(e) => {
                setTipAmount(e.target.value);
              }}
              placeholder="Tip"
              className={Styles.tipContainer__inner__input}
            />
          )}
          <span>
            Tip = <b>INR {tipAmount}</b>
          </span>
        </div>
      </div>
      <div className={Styles.detailsContainer}>
        <PhoneInputCommon
          phoneInput={phoneInput}
          setPhoneInput={setPhoneInput}
          phoneHandleBlur={phoneHandleBlur}
          customClass={Styles.phoneInputCustom}
          phoneError={phoneError}
        />
        <Input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          name="nameInput"
          label="Full Name"
          handleBlur={nameHandleBlur}
          errorMsg={nameError}
          customClass={Styles.detailsContainer__field}
        />
        <Input
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          name="emailInput"
          label="Email Address"
          handleBlur={emailHandleBlur}
          errorMsg={emailError}
          customClass={Styles.detailsContainer__field}
        />
        <div className={Styles.checkbox}>
          <Checkbox
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            label={`Check box to make your donation anonymous`}
          />
        </div>
        <Button
          onClick={handlePayment}
          customClass={
            ctaDisable
              ? Styles.detailsContainer__btn__disabled
              : Styles.detailsContainer__btn
          }
          name={`Pay INR ${Number(donationAmount) + Number(tipAmount)}`}
          disabled={ctaDisable}
        />
      </div>
    </Modal>
  );
}

export default PaymentModal;
