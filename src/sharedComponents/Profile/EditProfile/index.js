import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import OptionalScreen from "@/sharedComponents/AuthModal/OptionalScreen";
import Button from "@/Widgets/Button";
import Modal from "@/Widgets/Modal";
import { splitFullName } from "@/utils/name";
import { updateRegisteredUserDetails } from "@/services/login";
import NGOProfile from "./NGOProfile";
import Cookies from "js-cookie";
import { updateNgoProfileDetails } from "@/services/profile";

// const IS_NGO = true;

const desktopStyle = {
  background: "white",
  borderRadius: 10,
  height: "fit-content",
  padding: "0px",
  overflowY: "scroll",
  padding: "20px 0px",
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
  overflowY: "scroll",
  paddingTop: "32px",
};

function EditProfile({ isMobile, isOpen, setIsOpen, userData }) {
  const isNgo = Cookies.get("userType") == "ngo";
  const getName = () => {
    let res = "";
    if (userData.firstName) {
      res = userData.firstName;
    }
    if (userData.lastName) {
      res = res + " " + userData.lastName;
    }
    return res;
  };

  const [showCta, setShowCta] = useState(false);
  const [nameInput, setNameInput] = useState(getName());
  const [emailInput, setEmailInput] = useState(
    userData.email ? userData.email : ""
  );
  const [gender, setGender] = useState(userData.gender ? userData.gender : "");
  const [date, setDate] = useState(
    userData.birthDate ? userData.birthDate : ""
  );
  const [editProfileError, setEditProfileError] = useState("");

  // const [ngoEditProfilesData, setNgoEditProfileData] = useState({
  //   website: "",
  //   fullName: getName(),
  //   gender: userData.gender,
  //   designation: "",
  //   email: userData.email,
  //   registeredAddress: "",
  // });

  const [editDetails, setEditDetails] = useState(
    isNgo
      ? {
          website: userData.ngoDetail.websiteUrl,
          // state: "", //
          // city: "", //
          fullName: getName(),
          gender: userData.gender,
          designation: userData.roleInOrganization,
          email: userData.email,
          registeredAddress: userData.ngoDetail.registeredAddress,
        }
      : {}
  );

  useEffect(() => {
    setEditProfileError("");
  }, [nameInput, gender, emailInput, date, editDetails]);

  const handleUpdateDetails = () => {
    if (isNgo) {
      const splittedNameOptionalScreen = splitFullName(editDetails.fullName);
      if (
        userData.firstName === splittedNameOptionalScreen.firstName &&
        userData.lastName === splittedNameOptionalScreen.lastName &&
        userData.email === editDetails.email &&
        userData.ngoDetail.websiteUrl === editDetails.website &&
        userData.gender === editDetails.gender &&
        userData.roleInOrganization === editDetails.designation &&
        userData.ngoDetail.registeredAddress === editDetails.registeredAddress
      ) {
        setEditProfileError("There are no changes in your profile details");
      } else {
        if (
          editDetails.fullName &&
          editDetails.email &&
          editDetails.gender &&
          editDetails.website &&
          editDetails.designation &&
          editDetails.registeredAddress
        ) {
          //call api
          updateNgoProfileDetails({
            contact: {
              firstName: splittedNameOptionalScreen.firstName,
              lastName: splittedNameOptionalScreen.lastName,
              email: editDetails.email,
              gender: editDetails.gender,
              phoneDetail: {
                phoneNumber: userData.phoneNumber.split("-")[1],
                countryCode: userData.phoneNumber.split("-")[0],
              },
            },
            registeredAddress: editDetails.registeredAddress,
            roleInOrganization: editDetails.designation,
            // country: "India",
            // state: "Karnataka",
            // city: "mysore",
            // zipCode: "560104",
            websiteUrl: editDetails.website,
          })
            .then((res) => res.json())
            .then((json) => {
              if (json.success) {
                setIsOpen(false);
                window.location.reload();
              } else {
                setEditProfileError("Oops! Something went wrong!");
              }
            });
        } else {
          setEditProfileError("All fields are mandatory");
        }
      }
    } else {
      const splittedNameOptionalScreen = splitFullName(nameInput);
      if (
        userData.firstName === splittedNameOptionalScreen.firstName &&
        userData.lastName === splittedNameOptionalScreen.lastName &&
        userData.email === emailInput &&
        userData.birthDate === date &&
        userData.gender === gender
      ) {
        setEditProfileError("There are no changes in your profile details");
      } else {
        updateRegisteredUserDetails({
          firstName: splittedNameOptionalScreen.firstName,
          lastName: splittedNameOptionalScreen.lastName,
          email: emailInput ? emailInput : null,
          phoneDetail: {
            phoneNumber: userData.phoneNumber.split("-")[1],
            countryCode: userData.phoneNumber.split("-")[0],
          },
          birthDate: date ? date : null,
          isNgo: userData.isNgo,
          gender: gender ? gender : null,
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.success) {
              setIsOpen(false);
            } else {
              setEditProfileError("Oops! Something went wrong!");
            }
          });
      }
      // const splittedNameOptionalScreen = splitFullName(nameInput);
      // if (
      //   userData.firstName === splittedNameOptionalScreen.firstName &&
      //   userData.lastName === splittedNameOptionalScreen.lastName &&
      //   userData.email === emailInput &&
      //   userData.birthDate === date &&
      //   userData.gender === gender
      // ) {
      //   setEditProfileError("There are no changes in your profile details");
      // } else {
      //   updateRegisteredUserDetails({
      //     firstName: splittedNameOptionalScreen.firstName,
      //     lastName: splittedNameOptionalScreen.lastName,
      //     email: emailInput ? emailInput : null,
      //     phoneDetail: {
      //       phoneNumber: userData.phoneNumber.split("-")[1],
      //       countryCode: userData.phoneNumber.split("-")[0],
      //     },
      //     birthDate: date ? date : null,
      //     isNgo: userData.isNgo,
      //     gender: gender ? gender : null,
      //   })
      //     .then((res) => res.json())
      //     .then((json) => {
      //       if (json.success) {
      //         setIsOpen(false);
      //       } else {
      //         setEditProfileError("Oops! Something went wrong!");
      //       }
      //     });
    }
  };

  return (
    <Modal
      customClassName={isMobile ? mobileStyle : desktopStyle}
      isOpen={isOpen}
      closeModal={() => setIsOpen(false)}
      showCloseButton={true}
    >
      <div style={{ textAlign: "center" }}>
        Edit or Add your Profile Details
      </div>
      <div className={Styles.wrapper}>
        {isNgo ? (
          <NGOProfile
            setShowCta={setShowCta}
            editDetails={editDetails}
            setEditDetails={setEditDetails}
          />
        ) : (
          <OptionalScreen
            setShowCta={setShowCta}
            nameInput={nameInput}
            setNameInput={setNameInput}
            emailInput={emailInput}
            setEmailInput={setEmailInput}
            gender={gender}
            setGender={setGender}
            date={date}
            setDate={setDate}
            showTitle={false}
          />
        )}
        <Button
          disabled={!showCta}
          onClick={handleUpdateDetails}
          customClass={showCta ? Styles.btn : Styles.btn__disabled}
          name="Update Details"
        />
        {editProfileError && (
          <div className={Styles.err}>{editProfileError}</div>
        )}
      </div>
      {/* <OptionalScreen
        setShowCta={setShowCta}
        nameInput={nameInput}
        setNameInput={setNameInput}
        emailInput={emailInput}
        setEmailInput={setEmailInput}
        gender={gender}
        setGender={setGender}
        date={date}
        setDate={setDate}
      />
      <Button
        disabled={!showCta}
        onClick={() => {}}
        customClass={showCta ? Styles.btn : Styles.btn__disabled}
        name="Update Details"
      /> */}
    </Modal>
  );
}

export default EditProfile;
