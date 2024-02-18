import React from "react";
// import PropTypes from "prop-types";
// import { track } from "app/analytics/utils";
import Styles from "./index.module.scss";
function Toggle({ showToggle, setShowToggle }) {
  const handleChange = () => {
    setShowToggle(!showToggle);
    // if (section) {
    //   track(({ Accounts }) =>
    //     Accounts.referralToggleButton({
    //       screen: "mobile_number",
    //       section,
    //       actions: "single_page_form",
    //     })
    //   );
    // }
  };

  return (
    <label className={Styles["toggle-switch"]}>
      <input type="checkbox" checked={showToggle} onChange={handleChange} />
      <span className={Styles.switch} />
    </label>
  );
}

// Toggle.propTypes = {
//   showToggle: PropTypes.bool,
//   setShowToggle: PropTypes.func,
//   section: PropTypes.string,
// };

export default Toggle;
