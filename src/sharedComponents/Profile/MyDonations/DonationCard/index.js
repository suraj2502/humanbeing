import React, { useState } from "react";
import Styles from "./index.module.scss";
import Button from "@/Widgets/Button";
import ShareModal from "@/sharedComponents/SharedModal";

const campaingnTitle = "Campaign Title";

function DonationCard({ item }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const message = `Check out this campaign : ${campaingnTitle}`;

  const handleShare = (e) => {
    setIsShareModalOpen(true);
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <>
      {isShareModalOpen && (
        <ShareModal
          isOpen={isShareModalOpen}
          setOpen={setIsShareModalOpen}
          url={window.location.href}
          programTitle={campaingnTitle}
          message={message}
        />
      )}
      <a
        href={`/donate/${item?.campaign_code ? item.campaign_code : ""}`}
        onClick={() => console.log("redirect to campaign")}
        className={Styles.container}
      >
        <div className={Styles.container__left}>
          <span className={Styles.container__left__donation}>
            You donated <b>INR {item.donation_amount}</b> to this campaign
          </span>
          <div className={Styles.container__left__title}>
            {item.campaign_name}
          </div>
          <div className={Styles.container__left__description}>
            {item.campaign_description}
          </div>
        </div>
        <div className={Styles.container__right}>
          <Button
            onClick={handleShare}
            name="Spread The Word"
            customClass={Styles.container__right__btnSpread}
          />
          <Button
            //   onClick={() => setIsShareModalOpen(true)}
            name="Download Tax Certificate"
            customClass={Styles.container__right__btnView}
          />
        </div>
      </a>
    </>
  );
}

export default DonationCard;
