import React, { useState } from "react";
import ColorTitle from "@/sharedComponents/ColorTitle";
import Modal from "@/Widgets/Modal";
import Image from "next/image";
import Styles from "./index.module.scss";

function AboutCampaign({ data, isMobile }) {
  const [isImageModalOpen, setIsImageModalOpen] = useState("");

  const desktopStyle = {
    background: "transparent",
    borderRadius: 10,
    height: "80%",
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
    background: "transparent",
  };

  return (
    <section className={Styles.container}>
      {isImageModalOpen && (
        <Modal
          isOpen={isImageModalOpen}
          showCloseButton={isImageModalOpen}
          modalName="document"
          closeModal={() => setIsImageModalOpen("")}
          customClassName={isMobile ? mobileStyle : desktopStyle}
        >
          <Image src={isImageModalOpen} layout="fill" objectFit="contain" />
        </Modal>
      )}
      <ColorTitle text={data.title} />
      <div className={Styles.container__supportersDetailsWrapper}>
        {isMobile && (
          <div
            className={Styles.container__supportersDetailsWrapper__supporter}
          >
            <h3>Top Donors</h3>
            <table>
              <tr>
                <th>Name</th>
                <th>Amount</th>
              </tr>
              {data.highestDonations.map((item) => {
                return (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>
                      {item.currency} {item.amount}
                    </td>
                  </tr>
                );
              })}
            </table>
            <p>View All Donors</p>
          </div>
        )}
        <div className={Styles.container__supportersDetailsWrapper__details}>
          <table>
            <tr>
              <th>Created By</th>
              <th>Created For</th>
            </tr>
            <tr>
              <td>
                <p>{data.createdBy}</p>
                {/* <i>Location 1</i> */}
              </td>
              <td>
                <p>{data.createdFor}</p>
                {/* <i>Location 2</i> */}
              </td>
            </tr>
          </table>
          {data.supportingDocs && data.supportingDocs.length > 0 && (
            <div>
              <ColorTitle text={data.documentsTitle} />
              {data.supportingDocs.map((item) => {
                return (
                  <Image
                    key={item}
                    onClick={() => setIsImageModalOpen(item)}
                    src={item}
                    width={isMobile ? 80 : 100}
                    height={isMobile ? 80 : 100}
                    objectFit="contain"
                    style={{
                      marginRight: "8px",
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
        {!isMobile && (
          <div
            className={Styles.container__supportersDetailsWrapper__supporter}
          >
            <h3>Top Donors</h3>
            <table>
              <tr>
                <th>Name</th>
                <th>Amount</th>
              </tr>
              {data.highestDonations.map((item) => {
                return (
                  <tr key={item.donorName}>
                    <td>{item.name || "Anonymous"}</td>
                    <td>
                      {item.currency} {item.amount}
                    </td>
                  </tr>
                );
              })}
            </table>
            {/* <p>View All Donors</p> */}
          </div>
        )}
        {/* <div className={Styles.container__supportersDetailsWrapper__supporter}>
          <h3>Top Donors</h3>
          <table>
            <tr>
              <th>Name</th>
              <th>Amount</th>
            </tr>
            {data.highestDonations.map((item) => {
              return (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>
                    {item.currency} {item.amount}
                  </td>
                </tr>
              );
            })}
          </table>
          <p>View All Donors</p>
        </div> */}
      </div>
    </section>
  );
}

export default AboutCampaign;
