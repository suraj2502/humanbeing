import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import Modal from "@/Widgets/Modal";
import { donationsByFilter } from "@/services/profile";
import Button from "@/Widgets/Button";
import BackArrow from "@/assets/icons/BackArrow";
import FileUploader from "@/sharedComponents/FileUploader";
// import Razorpay from "razorpay";

const desktopStyles = {
  background: "white",
  border: "none",
  height: "500px",
  transform: "translate(-50%, -50%)",
  position: "absolute",
  left: "50%",
  top: "50%",
  padding: "10px 20px",
  width: "720px",
  borderRadius: "16px",
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
};

const certificateUrl = "https://some-url";

function UploadCertificatesModal({
  isUploadCertificatesModalOpen,
  setIsUploadCertificatesModalOpen,
  isMobile,
  campaignCode,
}) {
  const [data, setData] = useState();
  const [showCertificateUpload, setShowCertificateUpload] = useState();
  const [certificate, setCertificate] = useState([]);

  useEffect(() => {
    donationsByFilter(campaignCode)
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        if (json.success && json.donationDetail) {
          setData(json.donationDetail);
        }
        // if (json.success) {
        //   setData(json.campaignDetails);
        // }
      });
  }, []);

  return (
    <Modal
      isOpen={isUploadCertificatesModalOpen}
      showCloseButton={isUploadCertificatesModalOpen}
      modalName="payment"
      closeModal={() => setIsUploadCertificatesModalOpen(false)}
      customClassName={isMobile ? mobileStyle : desktopStyles}
    >
      {showCertificateUpload ? (
        <>
          <BackArrow
            onClick={() => {
              setShowCertificateUpload();
            }}
          />
          <p>Please verify details before uploading certificate</p>
          <ul>
            <li>Payment Id: {showCertificateUpload.payment_code}</li>
            <li>Name: {showCertificateUpload.name}</li>
            <li>Amount: INR {showCertificateUpload.donation_amount}</li>
            <li>Campaign Name: {showCertificateUpload.campaign_name}</li>
          </ul>
          <div className={Styles.files}>
            <FileUploader
              title="Upload Tax Certificate"
              files={certificate}
              setFiles={(val) => setCertificate([...certificate, val])}
            />
          </div>
          {certificate && certificate.length > 0 && (
            <Button onClick={() => {}} customClass={Styles.btn} name="Upload" />
          )}
        </>
      ) : (
        <div class={Styles.tableFixHead}>
          <table>
            <thead>
              <tr>
                <th>Payment Id</th>
                <th>Name</th>
                <th>Certificate</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((item, idx) => {
                  return (
                    <tr>
                      <td>{item.payment_code}</td>
                      <td>{item.donor_details.full_name}</td>
                      <td>
                        <Button
                          onClick={() => {
                            setShowCertificateUpload(item);
                            setCertificate([]);
                          }}
                          customClass={Styles.tableFixHead__btn}
                          name={
                            certificateUrl
                              ? "Edit Certificate"
                              : "Upload Certificate"
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
      {/* <div class={Styles.tableFixHead}>
        <table>
          <thead>
            <tr>
              <th>Payment Id</th>
              <th>Name</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((item, idx) => {
                return (
                  <tr>
                    <td>{item.payment_code}</td>
                    <td>{item.donor_details.full_name}</td>
                    <td>
                      
                        <Button
                          onClick={() => setShowCertificateUpload(item)}
                          // customClass={Styles.container__btn}
                          name={certificateUrl ? "Edit Certificate" : "Upload Certificate"} 
                        />
                      
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div> */}
    </Modal>
  );
}

export default UploadCertificatesModal;
