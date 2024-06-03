import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import Input from "@/Widgets/InputBox";
import Dropdown from "@/sharedComponents/Dropdown";

const GENDER_DROPDOWN_LIST = ["Male", "Female", "Non-Binary"];

function NGOProfile({ setShowCta, editDetails, setEditDetails }) {
  // const [editDetails, setEditDetails] = useState({
  //   website: "",
  //   state: "", //
  //   city: "", //
  //   fullName: "",
  //   gender: "",
  //   designation: "",
  //   email: "",
  //   registeredAddress: "",
  // });

  useEffect(() => {
    setShowCta(true);
  }, []);

  return (
    <div className={Styles.form}>
      <Input
        value={editDetails.website}
        onChange={(e) =>
          setEditDetails({ ...editDetails, website: e.target.value })
        }
        name="websiteInput"
        label="Website URL"
        handleBlur={() => {}}
        customClass={Styles.form_input}
      />
      <Input
        value={editDetails.fullName}
        onChange={(e) =>
          setEditDetails({ ...editDetails, fullName: e.target.value })
        }
        name="fullName"
        label="Full Name"
        handleBlur={() => {}}
        customClass={Styles.form_input}
      />
      <Dropdown
        defaultValue={editDetails.gender}
        list={GENDER_DROPDOWN_LIST}
        placeholder="Select Gender"
        handleChange={(val) => setEditDetails({ ...editDetails, gender: val })}
        customClass={Styles.form_dropdown}
      />
      <Input
        value={editDetails.designation}
        onChange={(e) =>
          setEditDetails({ ...editDetails, designation: e.target.value })
        }
        name="designation"
        label="Designation"
        handleBlur={() => {}}
        customClass={Styles.form_input}
      />
      <Input
        value={editDetails.email}
        onChange={(e) =>
          setEditDetails({ ...editDetails, email: e.target.value })
        }
        name="email"
        label="Email"
        handleBlur={() => {}}
        customClass={Styles.form_input}
      />
      <Input
        isLongInput
        value={editDetails.registeredAddress}
        onChange={(e) =>
          setEditDetails({ ...editDetails, registeredAddress: e.target.value })
        }
        name="address"
        label="Registered Address"
        handleBlur={() => {}}
        customClass={Styles.form_input}
      />
    </div>
  );
}

export default NGOProfile;
