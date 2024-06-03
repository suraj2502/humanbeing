import React, { useRef, useState } from "react";
import Styles from "./index.module.scss";
import DonationsHeader from "./DonationsHeader";
import DonationCard from "../DonationsGrid/DonationCard";

function DonationsPage({ data, isMobile }) {
  const pageSizeRef = useRef(1);
  const [offset, setOffset] = useState(0);
  const [dataState, setDataState] = useState(data);
  //   const offsetRef = useRef(0);

  return (
    <div className={Styles.wrapper}>
      <DonationsHeader
        setDataState={setDataState}
        pageSizeRef={pageSizeRef}
        offset={offset}
        setOffset={setOffset}
        totalCampaigns={data.totalCount}
      />
      <div className={Styles.wrapper__grid}>
        {dataState?.donations?.map((item, idx) => {
          return <DonationCard key={idx} item={item} />;
        })}
      </div>
    </div>
  );
}

export default DonationsPage;
