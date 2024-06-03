import React from "react";
import ColorTitle from "@/sharedComponents/ColorTitle";
import Styles from "./index.module.scss";

function CampaignStory({ data }) {
  return (
    <section className={Styles.container}>
      <ColorTitle text={data.title} />
      <p>{data.story}</p>
    </section>
  );
}

export default CampaignStory;
