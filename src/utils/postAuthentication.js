import Cookies from "js-cookie";

export const handleLoginCookie = (userCode, token, isNgo) => {
  Cookies.set("userCode", userCode);
  Cookies.set("token", token);
  Cookies.set("userType", isNgo ? "ngo" : "normal");
};

export const handleLogoutCookie = () => {
  Cookies.remove("userCode");
  Cookies.remove("token");
  Cookies.remove("userType");
};
