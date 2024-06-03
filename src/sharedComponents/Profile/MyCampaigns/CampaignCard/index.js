import React, { useState } from "react";
import Styles from "./index.module.scss";
import Button from "@/Widgets/Button";
import ShareModal from "@/sharedComponents/SharedModal";
import Edit from "@/assets/icons/Edit";

const campaingnTitle = "Campaign Title";

function CampaignCard() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);

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
        onClick={() => {
          console.log("redirect to campaign");
        }}
        className={Styles.container}
      >
        <div className={Styles.container__edit}>
          <span>Edit</span> <Edit />
        </div>
        {/* <div className={Styles.container__more}>
            {!isMoreOptionsOpen && (
            <div
                onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}
                className={Styles.container__more__option}
            >
                ...
            </div>
            )}
            {isMoreOptionsOpen && (
            <div className={Styles.container__more__container}>
                
                <div className={Styles.container__more__container__btn}>
                View Campaign
                </div>
                <div className={Styles.container__more__container__btn}>
                Upload Documents
                </div>
            </div>
            )}
            </div>  */}
        <div className={Styles.container__left}>
          <span className={Styles.container__left__donation}>
            You raised <b>INR 5000</b> for this campaign
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
            onClick={() => {}}
            name="Withdraw"
            customClass={Styles.container__right__btnWithdraw}
          />
          <Button
            onClick={handleShare}
            name="Spread The Word"
            customClass={Styles.container__right__btnSpread}
          />
          <Button
            onClick={() => {}}
            name="Upload Certificates"
            customClass={Styles.container__right__btnSpread}
          />
        </div>
      </div>
    </>
  );
}

export default CampaignCard;
