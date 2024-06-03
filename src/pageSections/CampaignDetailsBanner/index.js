import React, { useState } from "react";
import Image from "next/image";
import numberWithCommas from "@/utils/numberWithCommas";
import Button from "@/Widgets/Button";
import ShareModal from "@/sharedComponents/SharedModal";
import Styles from "./index.module.scss";
// props: {
//     bannerImg: MOCK_API_DATA.campaignBannerImage,
//     bannerHeadline: MOCK_API_DATA.campaignTitle,
//     bannerDescription: MOCK_API_DATA.campaignDescription,
//     totalAmount: MOCK_API_DATA.goalAmount,
//     collectedAmount: MOCK_API_DATA.recievedAmount,
//     numberOfSupporters: MOCK_API_DATA.numberOfSupporters,
//   },
function CampaignDetailsBanner({ data, isMobile }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const calculateReceivedWidth = () => {
    return (data.collectedAmount / data.totalAmount) * 100;
  };

  const message = `Check out this campaign : ${data.bannerHeadline}`;

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
            //   onClick={() => setIsOpen(true)}
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
            <span>10 days left</span>
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
