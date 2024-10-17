import React, { useState } from "react";
import Styles from "./index.module.scss";
import Button from "@/Widgets/Button";
import numberWithCommas from "@/utils/numberWithCommas";
import Image from "next/image";
import { getOnlyDate } from "@/utils/date";
import Tick from "@/assets/icons/Tick";
import IconWrapper from "@/sharedComponents/IconWrapper";
import Exclamation from "@/assets/icons/Exclamation";
import PaymentModal from "@/sharedComponents/PaymentModal";
// {
//   bannerImg: "",
//   createdOn: "27 June, 2021",
//   donationCount: 1099,
//   title:
//     "Tsunami in Nepal Tsunami in Nepal Tsunami in Nepal Tsunami in Nepal",
// }

const IS_KYC_VERIFIED = false;
const IS_TAX_EXEMPT = true;

function DonationCard({ item, isMobile, userData }) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const calculateReceivedWidth = () => {
    return (item.consolidatedAmountRaised / item.targetAmount) * 100;
  };

  const handleDonateNow = (e) => {
    setIsPaymentModalOpen(true);
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <>
      {isPaymentModalOpen && (
        <PaymentModal
          isMobile={isMobile}
          isPaymentModalOpen={isPaymentModalOpen}
          setIsPaymentModalOpen={setIsPaymentModalOpen}
          userData={userData}
          campaignCode={item.campaignCode}
        />
      )}

      <a href={`/donate/${item.campaignCode}`} className={Styles.card}>
        {item?.inrTaxExempt && (
          <div className={Styles.ribbonContainer}>
            <div
              className={Styles.ribbonText}
              dangerouslySetInnerHTML={{ __html: "Tax Benefits" }}
            />
          </div>
        )}
        <div className={Styles.card__img}>
          <Image
            layout="fill"
            style={{ objectFit: "contain" }}
            src={item.campaignImages[0]}
          />
          <div className={Styles.card__img__graphWrapper}>
            <div className={Styles.card__info__graph}>
              <div
                className={Styles.card__info__graph__received}
                style={{ width: `${calculateReceivedWidth()}%` }}
              ></div>
              <div
                className={Styles.card__info__graph__receivedIndicator}
                style={{ left: `${calculateReceivedWidth()}%` }}
              ></div>
              <span
                className={Styles.card__info__graph__receivedAmount}
                style={{ left: `calc(${calculateReceivedWidth()}% - 10px)` }}
              >
                Rs. {numberWithCommas(item.consolidatedAmountRaised)}
              </span>
              <div className={Styles.card__info__graph__goal}>
                Rs. {item.targetAmount}
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.card__info}>
          <div className={Styles.card__info__wrapper}>
            <div className={Styles.card__info__wrapper__date}>
              {getOnlyDate(item.createdOn)}
            </div>
            <div className={Styles.card__info__wrapper__donation}>
              {item.totalDonationsCount} donations
            </div>
          </div>
          <div className={Styles.card__info__title}>{item.campaignName}</div>
          <div className={Styles.card__info__creator}>
            {item?.campaignIsVerified ? (
              <>
                <IconWrapper color="#19ae19">
                  <Tick />
                </IconWrapper>
                <div>
                  <span>This campaign is KYC Verified</span>
                </div>
              </>
            ) : (
              <>
                {/* <IconWrapper color="#19ae19">
                <Tick />
              </IconWrapper> */}
                <Exclamation />
                <div>
                  <span>{`This campaign's KYC is pending`}</span>
                </div>
              </>
            )}
            {/* <Image
            style={{ borderRadius: "50%" }}
            width={40}
            height={40}
            src="https://kettocdn.gumlet.io/media/ngo/2126000/2126175/image/06ca47bf6fb24ce0f07a112d71b9f1a83a845b24.png?w=50&dpr=2.0"
          /> */}
          </div>
          <Button
            onClick={handleDonateNow}
            name="Donate Now"
            customClass={Styles.card__info__btn}
          />
        </div>
      </a>
    </>
  );
}

export default DonationCard;
