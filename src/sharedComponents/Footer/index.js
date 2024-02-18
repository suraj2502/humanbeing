import React from "react";
import Link from "next/link";
import Styles from "./index.module.scss";
import Logo from "@/assets/icons/Logo";
import Fundraiser from "@/assets/icons/Fundraiser";

const ABOUT_LINKS = [
  {
    name: "Partners",
    redirectTo: "/partners",
  },
  {
    name: "How-to",
    redirectTo: "/how-to",
  },
  {
    name: "Community",
    redirectTo: "/community",
  },
  {
    name: "Contact Us",
    redirectTo: "/contact-us",
  },
];

const TERM_LINKS = [
  {
    name: "Partners",
    redirectTo: "/partners",
  },
  {
    name: "How-to",
    redirectTo: "/how-to",
  },
  {
    name: "Community",
    redirectTo: "/community",
  },
  {
    name: "Contact Us",
    redirectTo: "/contact-us",
  },
];

function Footer() {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.footer__left}>
        <div className={Styles.footer__left__about}>
          <span>ABOUT</span>
          <div className={Styles.footer__left__about__links}>
            {ABOUT_LINKS.map((item, idx) => {
              return (
                <Link key={idx} href={item.redirectTo}>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className={Styles.footer__left__about}>
          <span>TERMS & CONDITIONS</span>
          <div className={Styles.footer__left__about__links}>
            {TERM_LINKS.map((item, idx) => {
              return (
                <Link key={idx} href={item.redirectTo}>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className={Styles.footer__right}>
        <div className={Styles.footer__right__office}>
          <span>OUR OFFICE</span>
          <p>
            Jalan Rambu Raya Timur No. 18, Kota Administrasi, Jakarta Pusat.
            ZIP: 10000
          </p>
        </div>
        <span>2023 © HumanBeing</span>
      </div>
    </footer>
  );
}

export default Footer;
