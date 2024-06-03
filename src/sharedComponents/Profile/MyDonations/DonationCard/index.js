import React, { useState } from "react";
import Styles from "./index.module.scss";
import Button from "@/Widgets/Button";
import ShareModal from "@/sharedComponents/SharedModal";

const campaingnTitle = "Campaign Title";

function DonationCard() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const message = `Check out this campaign : ${campaingnTitle}`;

  const handleShare = (e) => {
    e.stopPropagation();
    setIsShareModalOpen(true);
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
      <div
        onClick={() => console.log("redirect to campaign")}
        className={Styles.container}
      >
        <div className={Styles.container__left}>
          <span className={Styles.container__left__donation}>
            You donated <b>INR 5000</b> to this campaign
          </span>
          <div className={Styles.container__left__title}>
            This is campaign title This is campaign title This is campaign title
            This is campaign title
          </div>
          <div className={Styles.container__left__description}>
            This is campaign description This is campaign description This is
            campaign description This is campaign description This is campaign
            description This is campaign description This is campaign
            description This is campaign description This is campaign
            description
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
      </div>
    </>
  );
}

export default DonationCard;
