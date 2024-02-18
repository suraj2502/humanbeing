import React from "react";
import Styles from "./index.module.scss";
import Button from "@/Widgets/Button";
import numberWithCommas from "@/utils/numberWithCommas";
import Image from "next/image";

// {
//   bannerImg: "",
//   createdOn: "27 June, 2021",
//   donationCount: 1099,
//   title:
//     "Tsunami in Nepal Tsunami in Nepal Tsunami in Nepal Tsunami in Nepal",
// }

function DonationCard({ item }) {
  const calculateReceivedWidth = () => {
    return (item.recievedAmount / item.goalAmount) * 100;
  };

  return (
    <div className={Styles.card}>
      <div className={Styles.card__img}>
        <Image
          layout="fill"
          style={{ objectFit: "contain" }}
          src="https://kettocdn.gumlet.io/media/campaign/804000/804405/image/wid64798a5615526.jpg?w=320&dpr=2.0"
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
              Rs. {numberWithCommas(item.recievedAmount)}
            </span>
            <div className={Styles.card__info__graph__goal}>
              Rs. {item.goalAmount}
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.card__info}>
        <div className={Styles.card__info__wrapper}>
          <div className={Styles.card__info__wrapper__date}>
            {item.createdOn}
          </div>
          <div className={Styles.card__info__wrapper__donation}>
            {item.donationCount} donations
          </div>
        </div>
        <div className={Styles.card__info__title}>{item.title}</div>
        <div className={Styles.card__info__creator}>
          <Image
            style={{ borderRadius: "50%" }}
            width={40}
            height={40}
            src="https://kettocdn.gumlet.io/media/ngo/2126000/2126175/image/06ca47bf6fb24ce0f07a112d71b9f1a83a845b24.png?w=50&dpr=2.0"
          />
          <div>
            created by <span>{item.creatorName}</span>
          </div>
        </div>
        <Button
          //   onClick={() => setIsOpen(true)}
          name="Donate Now"
          customClass={Styles.card__info__btn}
        />
      </div>
    </div>
  );
}

export default DonationCard;
