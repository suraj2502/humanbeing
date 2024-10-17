import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import DonationCard from "./DonationCard";
import Button from "@/Widgets/Button";
import { donationsByFilter } from "@/services/profile";
import Cookies from "js-cookie";

const MY_DONATIONS_DATA = [
  {
    campaignTitle: "title",
    campaignDescription: "description",
    donatedAmount: "20000",
    currency: "INR",
    campaignLink: "http://localhost:3000/donate/1",
  },
  {
    campaignTitle: "title",
    campaignDescription: "description",
    donatedAmount: "20000",
    currency: "INR",
    campaignLink: "http://localhost:3000/donate/1",
  },
  {
    campaignTitle: "title",
    campaignDescription: "description",
    donatedAmount: "20000",
    currency: "INR",
    campaignLink: "http://localhost:3000/donate/1",
  },
  {
    campaignTitle: "title",
    campaignDescription: "description",
    donatedAmount: "20000",
    currency: "INR",
    campaignLink: "http://localhost:3000/donate/1",
  },
  {
    campaignTitle: "title",
    campaignDescription: "description",
    donatedAmount: "20000",
    currency: "INR",
    campaignLink: "http://localhost:3000/donate/1",
  },
];

function MyDonations() {
  const [data, setData] = useState("");

  useEffect(() => {
    donationsByFilter("", Cookies.get("userCode"))
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        if (json.success) {
          setData(json?.donationDetail);
        }
      });
  }, []);

  return (
    <div className={Styles.wrapper}>
      {data && data.length > 0 ? (
        <>
          {data.map((item, idx) => {
            return <DonationCard item={item} key={idx} />;
          })}
        </>
      ) : (
        <>
          <div>
            {
              "You haven't made any donations, explore our fundraisers by clicking on the button below"
            }
          </div>
          <Button
            hrefLink="/donate"
            name="View Fundraisers"
            customClass={Styles.btn}
          />
        </>
      )}
    </div>
  );
}

export default MyDonations;

// camapign title/campaign description/share/donated amount
