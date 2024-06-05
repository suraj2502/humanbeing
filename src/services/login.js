import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

export const sendOtp = (payload) => {
  return fetch("https://altruvo.org/api/login", {
    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify(payload),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

export const verifyOtp = (payload) => {
  return fetch("https://altruvo.org/api/verify-otp", {
    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify(payload),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

export const updateRegisteredUserDetails = (payload) => {
  payload = { ...payload, isActive: false, userCode: Cookies.get("userCode") };
  const token = Cookies.get("token");

  return fetch("https://altruvo.org/api/update-user", {
    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify(payload),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Token ${token}`,
    },
  });
};

export const getUserByPhone = (payload) => {
  payload = { ...payload, correlationKey: uuidv4() };
  return fetch("https://altruvo.org/api/get-user-by-phone", {
    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify(payload),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

export const createNgoUser = (payload) => {
  return fetch("https://altruvo.org/api/register/ngo", {
    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify(payload),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

export const getUserDetails = () => {
  let payload = {
    userCode: Cookies.get("userCode"),
  };
  const token = Cookies.get("token");

  return fetch("https://altruvo.org/api/get-user-details", {
    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify(payload),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Token ${token}`,
    },
  });
};

export const getNgoUserDetails = (payload = {}) => {
  const userCode = Cookies.get("userCode");
  const token = Cookies.get("token");

  return fetch(`https://altruvo.org/api/ngo_user/${userCode}`, {
    // Adding method type
    method: "GET",

    // Adding body or contents to send
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Token ${token}`,
    },
  });
};