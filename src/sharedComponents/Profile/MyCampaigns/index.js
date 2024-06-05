import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import CampaignCard from "./CampaignCard";
import Button from "@/Widgets/Button";
import { campaignsByUser } from "@/services/profile";

const MY_CAMPAIGNS_DATA = [
  {
    campaignTitle: "title",
    campaignDescription: "description",
    raisedAmount: "20000",
    currency: "INR",
    campaignLink: "http://localhost:3000/donate/1",
  },
  {
    campaignTitle: "title",
    campaignDescription: "description",
    raisedAmount: "20000",
    currency: "INR",
    campaignLink: "http://localhost:3000/donate/1",
  },
  {
    campaignTitle: "title",
    campaignDescription: "description",
    raisedAmount: "20000",
    currency: "INR",
    campaignLink: "http://localhost:3000/donate/1",
  },
  {
    campaignTitle: "title",
    campaignDescription: "description",
    raisedAmount: "20000",
    currency: "INR",
    campaignLink: "http://localhost:3000/donate/1",
  },
  {
    campaignTitle: "title",
    campaignDescription: "description",
    raisedAmount: "20000",
    currency: "INR",
    campaignLink: "http://localhost:3000/donate/1",
  },
  {
    campaignTitle: "title",
    campaignDescription: "description",
    raisedAmount: "20000",
    currency: "INR",
    campaignLink: "http://localhost:3000/donate/1",
  },
];

function MyCampaigns() {
  const [data, setData] = useState([]);

  useEffect(() => {
    campaignsByUser()
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        if (json.success) {
          setData(json.campaignDetails);
        }
      });
  }, []);

  return (
    <div className={Styles.wrapper}>
      {data.length > 0 ? (
        <>
          {data.map((item, idx) => {
            return <CampaignCard key={idx} />;
          })}
        </>
      ) : (
        <>
          <div>
            {
              "You haven't create any campaigns, click on the button below to start one!"
            }
          </div>
          <Button
            hrefLink="/fundraiser"
            name="Start Fundraiser"
            customClass={Styles.btn}
          />
        </>
      )}
    </div>
  );
}

export default MyCampaigns;
