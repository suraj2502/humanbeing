import Cookies from "js-cookie";

export const getAmountBreakup = (amount) => {
  console.log("in getAMountbrkup");
  if (!amount) {
    return;
  }

  // const userCode = Cookies.get("userCode");
  // const token = Cookies.get("token");

  return fetch(
    `https://altruvo.org/api/payment/get-donation-breakup?donation_amount=${amount}`,
    {
      // Adding method type
      method: "GET",

      // Adding body or contents to send
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        // Authorization: `Token ${token}`,
      },
    }
  );
};

export const createPaymentSession = (obj) => {
  const userCode = Cookies.get("userCode");
  const token = Cookies.get("token");

  return fetch("https://altruvo.org/api/payment/create-payment-session", {
    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify(obj),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Token ${token}`,
    },
  });
};
