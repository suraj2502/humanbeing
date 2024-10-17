import React, { useEffect, useState } from "react";
import Header from "@/sharedComponents/Header";
import Footer from "@/sharedComponents/Footer";
import Profile from "@/sharedComponents/Profile";
import detectDevice from "@/utils/detectDevice";
import { getNgoUserDetails, getUserDetails } from "@/services/login";
import Cookies from "js-cookie";
import Styles from "./index.module.scss";
import CopyText from "@/sharedComponents/SharedModal/CopyText";

export default function PaymentStatus({ data, isMobile }) {
  const [orderId, setOrderId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    setOrderId(url.searchParams.get("order_id"));
    setPaymentId(url.searchParams.get("payment_id"));
    setSuccess(url.searchParams.get("success"));
  }, []);

  return (
    <div id="root">
      <Header isMobile={isMobile} />
      {success && (
        <div className={Styles.container}>
          <h1>
            {success == "true"
              ? "Your Payment was Successful!"
              : "Your transaction has failed"}
          </h1>
          <h2>
            {success == "true"
              ? "We appreciate your support towards this initiative. Thank You!"
              : "Refund Message here"}
          </h2>
          {success == "true" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" fill="green" />
              <path
                d="M7 12l3 3 6-6"
                stroke="white"
                stroke-width="2"
                fill="none"
              >
                <animate
                  attributeName="stroke-dasharray"
                  from="0, 12"
                  to="12, 0"
                  dur="0.5s"
                  repeatCount="1"
                  fill="freeze"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="0"
                  dur="0.5s"
                  begin="0.5s"
                  fill="freeze"
                />
              </path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" fill="#d21111" />
              <path
                d="M6 6l12 12M6 18l12-12"
                stroke="white"
                stroke-width="2"
                fill="none"
              >
                <animate
                  attributeName="stroke-dasharray"
                  from="0, 24"
                  to="24, 0"
                  dur="0.5s"
                  repeatCount="1"
                  fill="freeze"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="0"
                  dur="0.5s"
                  begin="0.5s"
                  fill="freeze"
                />
              </path>
            </svg>
          )}

          <span>
            Payment Id:{" "}
            <CopyText
              name={"Transacton Id"}
              handleClick={() => {}}
              value={paymentId}
            />
          </span>
          <span>
            Order Id:{" "}
            <CopyText
              name={"Order Id"}
              handleClick={() => {}}
              value={orderId}
            />
          </span>
        </div>
      )}
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  //All supporters API needed onClick
  const userAgent = context.req.headers["user-agent"];
  // console.log("userAgent--", detectDevice(userAgent));
  const isMobile = detectDevice(userAgent);

  let data = {};
  return { props: { data: [], isMobile } };
}
