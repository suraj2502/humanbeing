import React, { useState } from "react";
import dynamic from "next/dynamic";
import Styles from "./index.module.scss";
import Button from "@/Widgets/Button";
import Tabs from "@/Widgets/Tabs";
import MyDonations from "./MyDonations";
import MyCampaigns from "./MyCampaigns";
// import EditProfile from "./EditProfile";

const AsyncEditProfile = dynamic(() => import("./EditProfile"), {
  loading: () => <></>,
});

const PROFILE_TABS = ["My Donation(s)", "My Campaign(s)"];

function Profile({ userData, setUserData, isMobile }) {
  const [activeTab, setActiveTab] = useState(PROFILE_TABS[0]);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  console.log("data profile", userData);

  const getComponentAccordingToTab = () => {
    switch (activeTab) {
      case "My Donation(s)":
        return <MyDonations />;
      case "My Campaign(s)":
        return <MyCampaigns isMobile={isMobile} />;
    }
  };

  const displayName = () => {
    if (userData.firstName) {
      return userData.firstName + " " + userData.lastName;
    }
    if (userData.phoneNumber) {
      return userData.phoneNumber.split("-")[1];
    }
    return "";
  };

  return (
    <>
      {showEditProfileModal && (
        <AsyncEditProfile
          isOpen={showEditProfileModal}
          setIsOpen={setShowEditProfileModal}
          isMobile={isMobile}
          userData={userData}
        />
      )}
      <div className={Styles.wrapper}>
        <div className={Styles.wrapper__header}>
          <div className={Styles.wrapper__header__left}>
            <p className={Styles.wrapper__header__left__welcome}>
              Welcome, <b>{displayName()}</b>
            </p>
            <p className={Styles.wrapper__header__left__info}>
              This is your profile page, visit this anytime to view your
              activity or to make any changes to your profile.
            </p>
          </div>
          <Button
            onClick={() => {
              setShowEditProfileModal(true);
            }}
            customClass={Styles.wrapper__header__btn}
            name="Edit Profile"
          />
        </div>
        <div className={Styles.wrapper__content}>
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={PROFILE_TABS}
          />
          {getComponentAccordingToTab()}
        </div>
      </div>
    </>
  );
}

export default Profile;
