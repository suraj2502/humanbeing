import React from "react";
import Header from "@/sharedComponents/Header";
import Footer from "@/sharedComponents/Footer";
import campaignDetailsSections from "@/specificPageSectionList/campaignDetails";
import detectDevice from "@/utils/detectDevice";

const desktopStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const mobileStyle = {
  // padding: "0px 20px",
};

export default function CampaignDetails({ data, isMobile }) {
  const sections = data.map((section) => {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: section.componentId,
      data: section.props,
      ui: campaignDetailsSections[section.componentName] || null,
      name: section.componentName,
    };
  });

  return (
    <>
    <div style={isMobile ? mobileStyle : desktopStyle} id="root">
      <Header isMobile={isMobile} />
      {sections.map((item) => {
        const Section = item.ui;
        console.log("tem.data", item.data);
        return Section ? (
          <Section
            isMobile={isMobile}
            data={item.data}
            name={item.name}
            id={item.id}
          />
        ) : null;
      })}
    </div>
    <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const userAgent = context.req.headers["user-agent"];
  // console.log("userAgent--", detectDevice(userAgent));
  const isMobile = detectDevice(userAgent);
  // Fetch data from external API
  //All supporters API needed onClick
  const MOCK_API_DATA = {
    campaignTitle: "Campaign Title",
    campaignBannerImage:
      "https://cimages.milaap.org/milaap/image/upload/c_fill,h_452,w_603/v1709715941/production/images/campaign/761952/eon1zt5id1zdjmolewrj_1709715964.jpg",
    goalAmount: 2300000,
    recievedAmount: 1576528,
    currency: "INR",
    numberOfSupporters: 2320,
    createdBy: "Name of creator",
    createdFor: "Shukla Suraj",
    campaignDescription:
      "Dear Friends, Family, and Kind Souls, My name is Vitthal Jawale, and today I come to you with a plea that stems from the deepest corners of a father's love. My daughter, Rutuja Vitthal Jawale, has been the source of immeasurable joy in our lives. However, our world has been shaken to its core by a diagnosis that no parent should ever have to face. Rutuja has been diagnosed with Acute Lymphoblastic Leukemia (ALL), a battle that she has been bravely fighting for the past six months at MGM Medical College and Hospital in Aurangabad.The news of her diagnosis hit us like a tidal wave, leaving us grappling with fear and uncertainty. But amidst the darkness, we cling onto a glimmer of hope - the possibility of life-saving treatment.",
    supportingDocs: [
      "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
      "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
      "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
      "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
    ],
    highestDonations: [
      {
        name: "Name 1",
        amount: 500,
        currency: "INR",
      },
      {
        name: "Name 2",
        amount: 1500,
        currency: "INR",
      },
      {
        name: "Name 3",
        amount: 1500,
        currency: "INR",
      },
      {
        name: "Name 4",
        amount: 1500,
        currency: "INR",
      },
      {
        name: "Name 5",
        amount: 1500,
        currency: "INR",
      },
    ],
  };

  const res = [
    {
      componentId: "1",
      componentName: "CampaignDetailsBanner",
      props: {
        bannerImg: MOCK_API_DATA.campaignBannerImage,
        bannerHeadline: MOCK_API_DATA.campaignTitle,
        bannerDescription: MOCK_API_DATA.campaignDescription,
        totalAmount: MOCK_API_DATA.goalAmount,
        collectedAmount: MOCK_API_DATA.recievedAmount,
        numberOfSupporters: MOCK_API_DATA.numberOfSupporters,
        beneficiaryName: MOCK_API_DATA.createdFor,
      },
    },
    {
      componentId: "2",
      componentName: "CampaignStory",
      props: {
        title: "The <span>Story</span>",
        story: MOCK_API_DATA.campaignDescription,
      },
    },
    {
      componentId: "3",
      componentName: "AboutCampaign",
      props: {
        title: "About the <span>Campaign</span>",
        documentsTitle: "Supporting <span>Documents</span>",
        createdBy: MOCK_API_DATA.createdBy,
        createdFor: MOCK_API_DATA.createdFor,
        highestDonations: MOCK_API_DATA.highestDonations,
        supportingDocs: MOCK_API_DATA.supportingDocs,
      },
    },
    {
      componentId: "4",
      componentName: "CallbackBanner",
      props: {
        title: "Want to refer someone in need to us ?",
        ctaTitle: "Refer to us",
      },
    },
  ];
  const data = res;

  // Pass data to the page via props
  return { props: { data, isMobile } };
}
