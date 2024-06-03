import React from "react";
import Styles from "./index.module.scss";
import Modal from "@/Widgets/Modal";
import CopyText from "./CopyText";
import SocialShareButton from "./SocialShareButton";

const SHARE_MODAL_TEXT = {
  TITLE: "Share this Campaign",
  SUBTITLE: `Share this campaign's details with your family & friends`,
  SHARE_LINK: "shareLink",
  UTM_PARAM:
    "utm_source=website&utm_medium=Organic&utm_campaign=share_button_PP",
};

const ShareModal = ({
  isOpen,
  setOpen,
  url,
  programTitle,
  message,
  isMobile,
}) => {
  const decodedUrl = decodeURIComponent(url);

  const closeModal = () => {
    setOpen(false);
  };
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

  const handleClick = () => {
    // track(({ UserEvents }) =>
    //   UserEvents.nonLeadCtaClicked({
    //     component_name: `share_icon`,
    //     button_name: `copy`,
    //     widget_level: 0,
    //     section: `programPage | share_icon`,
    //   })
    // );
  };

  return (
    isOpen && (
      <Modal
        isOpen={isOpen}
        // style={isMobile ? mobileStyle : desktopStyles}
        closeModal={closeModal}
        showCloseButton={false}
        customClassName={isMobile ? mobileStyle : desktopStyles}
      >
        <div className={Styles.shareModalContainer}>
          <div className={Styles.title}>{SHARE_MODAL_TEXT.TITLE}</div>
          <span onClick={() => closeModal()} className={Styles.closeButton} />
          <div className={Styles.subTitle}>{SHARE_MODAL_TEXT.SUBTITLE}</div>
          <CopyText
            name={SHARE_MODAL_TEXT.SHARE_LINK}
            handleClick={handleClick}
            value={decodedUrl}
          />
          <SocialShareButton
            shareUrl={url}
            programTitle={programTitle}
            message={message}
          />
        </div>
      </Modal>
    )
  );
};

export default ShareModal;
