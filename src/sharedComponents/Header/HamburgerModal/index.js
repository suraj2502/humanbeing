import React from "react";
import Link from "next/link";
import Styles from "./index.module.scss";
import Modal from "@/Widgets/Modal";
import UserIcon from "@/assets/icons/UserIcon";
import Button from "@/Widgets/Button";
import ProfileImage from "@/sharedComponents/ProfileDefaultImage";
import { handleLogoutCookie } from "@/utils/postAuthentication";

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

function HamburgerModal({
  isOpen,
  setIsOpen,
  NAV_LINKS,
  handleOpenAuthModal,
  handleOpenFundraiserModal,
  isLoggedIn,
}) {
  return (
    <>
      <Modal
        customClassName={mobileStyle}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      >
        <div className={Styles.container}>
          <div className={Styles.container__user}>
            {isLoggedIn ? (
              <>
                <ProfileImage name="Shukla" customClass={Styles.profileImg} />
                <span>Shuklere Suraj</span>
                <Button
                  onClick={() => {}}
                  customClass={Styles.container__user__logout}
                  name="View Profile"
                />
                <Button
                  onClick={() => {
                    handleLogoutCookie();
                    setIsOpen(false);
                  }}
                  customClass={Styles.container__user__logout}
                  name="Logout"
                />
              </>
            ) : (
              <>
                <UserIcon />
                <span>Guest User</span>
                <Button
                  onClick={handleOpenAuthModal}
                  customClass={Styles.container__user__login}
                  name="Sign Up"
                />
              </>
            )}
            {/* <UserIcon />
            <span>Guest User</span>
            <Button
              onClick={handleOpenAuthModal}
              customClass={Styles.container__user__login}
              name="Sign Up"
            /> */}
          </div>
          {NAV_LINKS.map((navItem, index) => {
            return (
              <Link
                className={Styles.container__btn}
                key={index}
                href={navItem.redirectTo}
              >
                {navItem.name}
              </Link>
            );
          })}
          <Button
            onClick={handleOpenFundraiserModal}
            customClass={Styles.container__fundraiser}
            name="START A FUNDRAISER"
          />
          {/* <div
            onClick={() => setIsFundraiserModalOpen(true)}
            className={Styles.header__container__logoContainer}
          >
            <Fundraiser />
            <span style={{ fontSize: "14px" }}>Start a Fundraiser</span>
          </div> */}
        </div>
      </Modal>
    </>
  );
}

export default HamburgerModal;
