import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

export const createCampaign = (payload) => {
  payload = {
    ...payload,
    correlationKey: uuidv4(),
    creatorUserCode: Cookies.get("userCode"),
  };
  const token = Cookies.get("token");
  return fetch("https://altruvo.org/api/campaign/create", {
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
