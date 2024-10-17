import React, { useEffect, useState } from "react";
import Link from "next/link";
import Styles from "./index.module.scss";
import Logo from "@/assets/icons/Logo";
import Fundraiser from "@/assets/icons/Fundraiser";
import FundraiserModal from "../FundraiserModal";
import Hamburger from "@/assets/icons/Hamburger";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import AuthModal from "../AuthModal";
import HamburgerModal from "./HamburgerModal";
import ProfileImage from "../ProfileDefaultImage";
import Cookies from "js-cookie";
import { handleLogoutCookie } from "@/utils/postAuthentication";

const IS_LOGGED_IN = false;

const NAV_LINKS = [
  {
    name: "About us",
    redirectTo: "/about-us",
  },
  {
    name: "Donate",
    redirectTo: "/donate",
  },
  {
    name: "Contact Us",
    redirectTo: "/contact-us",
  },
];

function Header({ isMobile }) {
  const [isFundraiserModalOpen, setIsFundraiserModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isHamburgerModalOpen, setIsHamburgerModalOpen] = useState(false);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authCookie = Cookies.get("userCode");

  useEffect(() => {
    if (authCookie) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      if (window.location.href.includes("/profile")) {
        window.location.href = "/";
      }
    }
  }, [authCookie]);

  const handleOpenAuthModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleOpenFundraiserModal = () => {
    window.location.href = "/fundraiser";
    // setIsFundraiserModalOpen(true);
  };

  return (
    <header className={Styles.header}>
      {isLoginModalOpen && (
        <AuthModal
          isMobile={isMobile}
          isOpen={isLoginModalOpen}
          setIsOpen={setIsLoginModalOpen}
        />
      )}
      {isFundraiserModalOpen && (
        <FundraiserModal
          isMobile={isMobile}
          isOpen={isFundraiserModalOpen}
          setIsOpen={setIsFundraiserModalOpen}
        />
      )}
      {isHamburgerModalOpen && (
        <HamburgerModal
          isOpen={isHamburgerModalOpen}
          setIsOpen={setIsHamburgerModalOpen}
          NAV_LINKS={NAV_LINKS}
          handleOpenAuthModal={handleOpenAuthModal}
          handleOpenFundraiserModal={handleOpenFundraiserModal}
          isLoggedIn={isLoggedIn}
        />
      )}
      <div className={Styles.header__container}>
        <Link href="/" className={Styles.header__container__logoContainer}>
          <img
            src="https://x-stg.glance-cdn.com/public/content/amp/other/altgo.jpeg"
            width={60}
            height={60}
          />
          <span>ALTRUVO</span>
        </Link>
        {isMobile ? (
          <div
            onClick={() => setIsHamburgerModalOpen(true)}
            className={Styles.header__container__hamburger}
          >
            <Hamburger />
          </div>
        ) : (
          <>
            <div className={Styles.header__container__nav}>
              {NAV_LINKS.map((navItem, index) => {
                return (
                  <Link key={index} href={navItem.redirectTo}>
                    {navItem.name}
                  </Link>
                );
              })}
            </div>
            <div className={Styles.header__container__rightContainer}>
              <div
                onClick={handleOpenFundraiserModal}
                className={Styles.header__container__logoContainer}
              >
                <Fundraiser />
                <span style={{ fontSize: "14px" }}>Start a Fundraiser</span>
              </div>
              <div
                onClick={
                  isLoggedIn ? handleProfileDropdown : handleOpenAuthModal
                }
                className={Styles.header__container__profile}
              >
                {isLoggedIn ? (
                  <>
                    <ProfileImage
                      // name="Shukla"
                      customClass={Styles.profileImg}
                    />
                    {showProfileDropdown && (
                      <div
                        className={Styles.header__container__profile__dropdown}
                      >
                        <a href="/profile">View Profile</a>
                        <span onClick={handleLogoutCookie}>Logout</span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <ProfileIcon />
                  </>
                )}
              </div>
            </div>
          </>
        )}
        {/* <div className={Styles.header__container__nav}>
          {NAV_LINKS.map((navItem, index) => {
            return (
              <Link key={index} href={navItem.redirectTo}>
                {navItem.name}
              </Link>
            );
          })}
        </div> */}
        {/* <div className={Styles.header__container__rightContainer}>
          <div
            onClick={() => setIsFundraiserModalOpen(true)}
            className={Styles.header__container__logoContainer}
          >
            <Fundraiser />
            <span style={{ fontSize: "14px" }}>Start a Fundraiser</span>
          </div>
        </div> */}
      </div>
    </header>
  );
}

export default Header;
