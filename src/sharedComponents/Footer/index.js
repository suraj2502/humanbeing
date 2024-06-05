import React from "react";
import Link from "next/link";
import Styles from "./index.module.scss";
import Logo from "@/assets/icons/Logo";
import Fundraiser from "@/assets/icons/Fundraiser";

const ABOUT_LINKS = [
  {
    name: "About us",
    redirectTo: "/about-us",
  },
  {
    name: "Donate",
    redirectTo: "/donate",
  },
  {
    name: "Terms & Conditions",
    redirectTo: "/terms-and-conditions",
  },
  {
    name: "Privacy Policy",
    redirectTo: "/privacy-policy",
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
          <Link href="/" className={Styles.footer__left__about__logoContainer}>
            <img
              src="https://x-stg.glance-cdn.com/public/content/amp/other/altgo.jpeg"
              width={60}
              height={60}
            />
            <span>ALTRUVO</span>
          </Link>
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
        {/* <div className={Styles.footer__left__about}>
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
        </div> */}
      </div>
      <div className={Styles.footer__right}>
        <div className={Styles.footer__right__office}>
          <span>OUR OFFICE</span>
          <p>
            1103 Aksansha Opluence, Shakti Nagar, Opposite Traffic Garden, Kota,
            India - 324009
          </p>
        </div>
        <span>2024 © Altruvo Social Ventures Pvt. Ltd.</span>
      </div>
    </footer>
  );
}

export default Footer;
