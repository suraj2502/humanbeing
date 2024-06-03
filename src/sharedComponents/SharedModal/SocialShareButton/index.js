import React from "react";
import Image from "next/image";
import Styles from "./index.module.scss";
import Whatsapp from "@/assets/icons/Whatsapp";
import Linkedin from "@/assets/icons/Linkedin";
import Gmail from "@/assets/icons/Gmail";
import Facebook from "@/assets/icons/Facebook";

function SocialShareButton({ shareUrl, programTitle, message }) {
  const social = [
    {
      key: "whatsapp",
      name: "WhatsApp",
      redirectUrl: `https://wa.me/?text=${message}`,
      iconSlug: "Whatsapp",
    },
    {
      key: "linkedin",
      name: "LinkedIn",
      redirectUrl: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${message}`,
      iconSlug: "Linkedin",
    },
    {
      key: "email",
      name: "Email",
      redirectUrl: `mailto:?subject=${programTitle}&body=${message}`,
      iconSlug: "Gmail",
    },
    {
      key: "facebook",
      name: "Facebook",
      redirectUrl: `http://www.facebook.com/sharer.php?u=${shareUrl}&p[title]=${message}`,
      iconSlug: "Facebook",
    },
  ];

  const shareOnSocial = (redirectUrl, buttonName) => {
    // track(({ UserEvents }) =>
    //   UserEvents.nonLeadCtaClicked({
    //     component_name: `share_icon`,
    //     button_name: buttonName,
    //     widget_level: 0,
    //     section: `programPage | share_icon`,
    //   })
    // );
    window.open(redirectUrl, "_blank");
  };

  const getSocialIcon = (obj) => {
    switch (obj.iconSlug) {
      case "Whatsapp":
        return <Whatsapp />;
      case "Linkedin":
        return <Linkedin />;
      case "Gmail":
        return <Gmail />;
      case "Facebook":
        return <Facebook />;
    }
  };

  return (
    <div className={Styles.main}>
      <div className={Styles.button}>
        <div className={Styles.socialButtonsContainer}>
          {social.map((icon) => {
            return (
              <div
                key={icon.key}
                className={Styles.iconContainer}
                onClick={() => shareOnSocial(icon.redirectUrl, icon.name)}
              >
                {getSocialIcon(icon)}
                {/* <Image
                  src={getImageUrl(icon.iconSlug, "svg")}
                  width={32}
                  height={32}
                  objectFit="contain"
                /> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SocialShareButton;
