import React, { useState } from "react";
import Image from "next/image";
import numberWithCommas from "@/utils/numberWithCommas";
import Button from "@/Widgets/Button";
import ShareModal from "@/sharedComponents/SharedModal";
import Styles from "./index.module.scss";
import Modal from "@/Widgets/Modal";
import PaymentModal from "@/sharedComponents/PaymentModal";
// props: {
//     bannerImg: MOCK_API_DATA.campaignBannerImage,
//     bannerHeadline: MOCK_API_DATA.campaignTitle,
//     bannerDescription: MOCK_API_DATA.campaignDescription,
//     totalAmount: MOCK_API_DATA.goalAmount,
//     collectedAmount: MOCK_API_DATA.recievedAmount,
//     numberOfSupporters: MOCK_API_DATA.numberOfSupporters,
//   },

const desktopStyle = {
  background: "transparent",
  borderRadius: 10,
  height: "80%",
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
  background: "transparent",
};

function CampaignDetailsBanner({ data, isMobile, userData }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const calculateReceivedWidth = () => {
    return (data.collectedAmount / data.totalAmount) * 100;
  };

  const message = `Check out this campaign : ${data.bannerHeadline}`;

  const numberOfDaysLeft = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in milliseconds
    const differenceMs = end - start;

    // Convert milliseconds to days
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    return differenceDays >= 0 ? differenceDays : 0;
  };

  return (
    <section className={Styles.container}>
      {isShareModalOpen && (
        <ShareModal
          isMobile={isMobile}
          isOpen={isShareModalOpen}
          setOpen={setIsShareModalOpen}
          url={window.location.href}
          programTitle={data.bannerHeadline}
          message={message}
        />
      )}
      {isPaymentModalOpen && (
        <PaymentModal
          isMobile={isMobile}
          isPaymentModalOpen={isPaymentModalOpen}
          setIsPaymentModalOpen={setIsPaymentModalOpen}
          userData={userData}
          campaignCode={data.campaignCode}
        />
      )}
      <h2>{data.bannerHeadline}</h2>
      <div className={Styles.container__imgPaymentWrapper}>
        <img
          src={data.bannerImg}
          width={isMobile ? "100%" : "60%"}
          // width="60%"
          loading="eager"
        />

        <div className={Styles.container__imgPaymentWrapper__paymentSection}>
          <h3>
            Help {data.beneficiaryName} by making a donation to this campaign
          </h3>
          <Button
            onClick={() => setIsPaymentModalOpen(true)}
            name="Donate Now"
            customClass={
              Styles.container__imgPaymentWrapper__paymentSection__btn
            }
          />
          <p>
            We accept payments through Credit & Debit Cards/Net
            Banking/UPI/Direct Bank Transfer
          </p>
          {/* <Button
            //   onClick={() => setIsOpen(true)}
            name="Spread The Word"
            customClass={
              Styles.container__imgPaymentWrapper__paymentSection__btn
            }
          /> */}
          <div
            className={
              Styles.container__imgPaymentWrapper__paymentSection__supportersWrapper
            }
          >
            <u>{data.numberOfSupporters} Supporters</u>
            <span>
              {numberOfDaysLeft(data.campaignStartDate, data.campaignEndDate)}{" "}
              days left
            </span>
          </div>
          <div
            className={
              Styles.container__imgPaymentWrapper__paymentSection__graph
            }
          >
            <div
              className={
                Styles.container__imgPaymentWrapper__paymentSection__graph__received
              }
              style={{ width: `${calculateReceivedWidth()}%` }}
            ></div>
            <div
              className={
                Styles.container__imgPaymentWrapper__paymentSection__graph__receivedIndicator
              }
              style={{ left: `${calculateReceivedWidth()}%` }}
            ></div>
            <span
              className={
                Styles.container__imgPaymentWrapper__paymentSection__graph__receivedAmount
              }
              style={{ left: `calc(${calculateReceivedWidth()}% - 10px)` }}
            >
              Rs. {numberWithCommas(data.collectedAmount)}
            </span>
            <div
              className={
                Styles.container__imgPaymentWrapper__paymentSection__graph__goal
              }
            >
              Rs. {data.totalAmount}
            </div>
          </div>
          <Button
            onClick={() => setIsShareModalOpen(true)}
            //   onClick={() => setIsOpen(true)}
            name="Spread The Word"
            customClass={
              Styles.container__imgPaymentWrapper__paymentSection__btnSpread
            }
          />
        </div>

        {/* <div className={Styles.container__imgPaymentWrapper__graph}>
          <div
            className={Styles.container__imgPaymentWrapper__graph__received}
            style={{ width: `${calculateReceivedWidth()}%` }}
          ></div>
          <div
            className={
              Styles.container__imgPaymentWrapper__graph__receivedIndicator
            }
            style={{ left: `${calculateReceivedWidth()}%` }}
          ></div>
          <span
            className={
              Styles.container__imgPaymentWrapper__graph__receivedAmount
            }
            style={{ left: `calc(${calculateReceivedWidth()}% - 10px)` }}
          >
            Rs. {numberWithCommas(data.collectedAmount)}
          </span>
          <div className={Styles.container__imgPaymentWrapper__graph__goal}>
            Rs. {data.totalAmount}
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default CampaignDetailsBanner;
