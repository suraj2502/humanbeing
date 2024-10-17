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

export const getCampaignById = (campaignId) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  return fetch(`https://altruvo.org/api/campaign/get-detail/${campaignId}`, {
    // Adding method type
    method: "GET",

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

export const uploadFiles = (title) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  let formData = new FormData();
  console.log(
    "ele...",
    document.getElementById(title),
    document.getElementById(title).files
  );
  let fileInput = document.getElementById(title)
  formData.append('images', fileInput.files[0]);
  // for (let x = 0; x < files.length; x++) {
  //   formData.append("images", files[x]);
  // }
  formData.append("someKey", "test")

  // for (const [key, value] of formData.entries()) {
  //   console.log(`${key}:`, value);
  // }
  // const blob = new Blob([formData], { type: 'multipart/form-data' });

  // if (files.length > 0) {
  //   formData.append("images", files);
  // }

  const token = Cookies.get("token");
  return fetch(`https://altruvo.org/api/image/upload`, {
    // Adding method type
    method: "POST",
    body: formData,

    // Adding headers to the request
    headers: {
      // "Content-type": "multipart/form-data",
      Authorization: `Token ${token}`,
    },
  });
};
