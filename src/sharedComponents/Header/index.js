import React from "react";
import Link from "next/link";
import Styles from "./index.module.scss";
import Logo from "@/assets/icons/Logo";
import Fundraiser from "@/assets/icons/Fundraiser";

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
    name: "Partner NGOs",
    redirectTo: "/partner-ngos",
  },
  {
    name: "Contact Us",
    redirectTo: "/contact-us",
  },
];

function Header() {
  return (
    <header className={Styles.header}>
      <div className={Styles.header__container}>
        <Link href="/" className={Styles.header__container__logoContainer}>
          <Logo />
          <span>HumanBeing</span>
        </Link>
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
          <Link
            className={Styles.header__container__logoContainer}
            href="/fundraiser"
          >
            <Fundraiser />
            <span style={{ fontSize: "14px" }}>Start a Fundraiser</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
