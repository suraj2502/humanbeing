import Cookies from "js-cookie";

export const updateNgoProfileDetails = (payload) => {
  payload = { ...payload, ngoUserCode: Cookies.get("userCode") };
  const token = Cookies.get("token");

  return fetch("https://altruvo.org/api/update-ngo-user", {
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

export const campaignsByUser = () => {
  const userCode = Cookies.get("userCode")
  const token = Cookies.get("token");

  return fetch(`https://altruvo.org/api/campaign/get-campaign-by-user/${userCode}`, {
    // Adding method type
    method: "GET",

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Token ${token}`,
    },
  });
};