import React from "react";
import Styles from "./index.module.scss";
import DonationCard from "./DonationCard";
import Button from "@/Widgets/Button";

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
  return (
    <div className={Styles.wrapper}>
      {MY_DONATIONS_DATA.length > 0 ? (
        <>
          {MY_DONATIONS_DATA.map((item, idx) => {
            return <DonationCard key={idx} />;
          })}
        </>
      ) : (
        <>
          <div>
           { "You haven't made any donations, explore our fundraisers by clicking on the button below"}
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
