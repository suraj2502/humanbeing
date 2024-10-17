import React from "react";
import ColorTitle from "@/sharedComponents/ColorTitle";
import Styles from "./index.module.scss";
import DonationCard from "./DonationCard";
import Link from "next/link";

function DonationsGrid({ data, name, isMobile, userData }) {
  console.log("donationData", data)
  return (
    <section id={name} className={Styles.container}>
      <ColorTitle text={data.title} />
      <div className={Styles.container__grid}>
        {data?.donations?.map((item, idx) => {
          return (
            <DonationCard
              userData={userData}
              isMobile={isMobile}
              key={idx}
              item={item}
            />
          );
        })}
        {/* <DonationCard />
        <DonationCard />
        <DonationCard />
        <DonationCard />
        <DonationCard />
        <DonationCard /> */}
      </div>
      {data.donations && data.donations.length > 1 && (
        <div className={Styles.container__viewAll}>
          <Link href="/donate">VIEW ALL</Link>
        </div>
      )}
    </section>
  );
}

export default DonationsGrid;
