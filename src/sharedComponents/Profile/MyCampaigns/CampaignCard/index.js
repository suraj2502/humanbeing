import React, { useState } from "react";
import Styles from "./index.module.scss";
import Button from "@/Widgets/Button";
import ShareModal from "@/sharedComponents/SharedModal";
import Edit from "@/assets/icons/Edit";
import UploadCertificatesModal from "./UploadCertificatesModal";
import Modal from "@/Widgets/Modal";

const campaingnTitle = "Campaign Title";

const desktopStyles = {
  background: "white",
  border: "none",
  height: "fit-content",
  transform: "translate(-50%, -50%)",
  position: "absolute",
  left: "50%",
  top: "50%",
  padding: "0",
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

function CampaignCard({ item, idx, isMobile }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const [showUploadCertificatesModal, setShowUploadCertificatesModal] =
    useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  console.log("item..", item);

  const message = `Check out this campaign : ${campaingnTitle}`;

  const handleShare = (e) => {
    setIsShareModalOpen(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleEdit = (e) => {
    setShowEditModal(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleUploadCertificate = (e) => {
    setShowUploadCertificatesModal(true);
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <>
      {isShareModalOpen && (
        <ShareModal
          isOpen={isShareModalOpen}
          setOpen={setIsShareModalOpen}
          url={`/donate`}
          programTitle={campaingnTitle}
          message={message}
        />
      )}
      {showUploadCertificatesModal && (
        <UploadCertificatesModal
          isUploadCertificatesModalOpen={showUploadCertificatesModal}
          setIsUploadCertificatesModalOpen={setShowUploadCertificatesModal}
          isMobile={isMobile}
          campaignCode={item.campaignCode}
        />
      )}
      {showEditModal && (
        <Modal
          isOpen={showEditModal}
          style={isMobile ? mobileStyle : desktopStyles}
          closeModal={() => setShowEditModal(false)}
          showCloseButton={showEditModal}
          customClassName={isMobile ? mobileStyle : desktopStyles}
        >
          Post an update here
        </Modal>
      )}
      <a
        // onClick={() => {
        //   window.location.href = ""
        // }}
        href={`/donate/${item.campaignCode}`}
        className={Styles.container}
      >
        <div onClick={handleEdit} className={Styles.container__edit}>
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
            You raised <b>INR {item?.consolidatedAmountRaised}</b> for this
            campaign
          </span>
          <div className={Styles.container__left__title}>
            {item?.campaignName}
          </div>
          <div className={Styles.container__left__description}>
            {item?.description}
          </div>
        </div>
        <div className={Styles.container__right}>
          {item?.progressPercentage >= 80 && (
            <Button
              onClick={() => {}}
              name="Withdraw"
              customClass={Styles.container__right__btnWithdraw}
            />
          )}
          <Button
            onClick={handleShare}
            name="Spread The Word"
            customClass={Styles.container__right__btnSpread}
          />
          <Button
            onClick={handleUploadCertificate}
            name="Upload Certificates"
            customClass={Styles.container__right__btnSpread}
          />
        </div>
      </a>
    </>
  );
}

export default CampaignCard;
