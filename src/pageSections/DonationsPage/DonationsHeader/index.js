import React, { useEffect } from "react";
import Styles from "./index.module.scss";
import { getAllCampaigns } from "@/services/homepage";

//offset - 0 -> disabled,
//0, 10, 19..

function DonationsHeader({
  pageSizeRef,
  offset,
  setOffset,
  totalCampaigns,
  setDataState,
}) {
  const handlePaginationApiCall = (newOffset) => {
    getAllCampaigns({
      pageSize: pageSizeRef.current,
      offset: newOffset,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setDataState({
            donations: json.campaignListingDetail,
            totalCount: json.totalCampaignCount,
          });
        } else {
          // window.location.href = "/500";
        }
      });
  };

  const handlePrev = () => {
    let newOffset = offset - pageSizeRef.current;
    setOffset(newOffset);
    handlePaginationApiCall(newOffset);
  };

  const handleNext = () => {
    let newOffset = pageSizeRef.current + offset;
    setOffset(pageSizeRef.current + offset);
    handlePaginationApiCall(newOffset);
  };

  return (
    <div className={Styles.container}>
      <div
        onClick={handlePrev}
        className={
          offset > 0 ? Styles.container__btn : Styles.container__btn__disabled
        }
      >
        Prev
      </div>
      <h1>Support a fundraiser with ALTRUVO</h1>
      <div
        onClick={handleNext}
        className={
          offset + pageSizeRef.current < totalCampaigns
            ? Styles.container__btn
            : Styles.container__btn__disabled
        }
      >
        Next
      </div>
    </div>
  );
}

export default DonationsHeader;
