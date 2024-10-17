import React, { useState, useEffect } from "react";
import Header from "@/sharedComponents/Header";
import Footer from "@/sharedComponents/Footer";
import campaignDetailsSections from "@/specificPageSectionList/campaignDetails";
import detectDevice from "@/utils/detectDevice";
import { getCampaignById } from "@/services/campaign";
import Cookies from "js-cookie";
import { getUserDetails, getNgoUserDetails } from "@/services/login";

// {
//   "success": true,
//   "correlationKey": "47f1792b-2b68-11ef-9c1e-06abcbc8ef17",
//   "campaignDetail": {
//       "campaignCode": "160000000004",
//       "campaignName": "Test 2",
//       "description": "Test 2",
//       "story": "",
//       "campaignSource": "",
//       "campaignCategory": "Education",
//       "campaignType": "",
//       "status": "Active",
//       "campaignStartDate": "2024-06-08T00:00:00+05:30",
//       "campaignEndDate": "2024-07-13T00:00:00+05:30",
//       "campaignGoal": "",
//       "consolidatedAmountRaised": 0,
//       "targetAmount": 100000,
//       "campaignImages": [
//           "https://cimages.milaap.org/milaap/image/upload/c_fill,h_452,w_603/v1709715941/production/images/campaign/761952/eon1zt5id1zdjmolewrj_1709715964.jpg"
//       ],
//       "supportingDocuments": [
//           "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0"
//       ],
//       "kycDocuments": [
//           "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0"
//       ],
//       "campaignVideo": "",
//       "campaignLocation": "",
//       "currency": "INR",
//       "progressPercentage": 0,
//       "inrTaxExempt": false,
//       "coverImageUrl": "",
//       "allowListingOnAltruvo": false,
//       "createdByUser": {
//           "userCode": "150000000020",
//           "fullName": "Salim Patekari",
//           "phoneNumber": ""
//       },
//       "createdFor": "",
//       "createdOn": "2024-06-08T14:56:21+05:30",
//       "modifiedOn": "2024-06-08T14:56:21+05:30",
//       "campaignUpdatedBy": "",
//       "campaignIsVerified": false,
//       "campaignIsApproved": false,
//       "isExpired": false,
//       "isClosed": false,
//       "totalDonationsCount": 0,
//       "isActive": true,
//       "pocName": "",
//       "pocPhoneNumber": "",
//       "patientRelationCategoryWithCreator": "",
//       "patientRelationTypeWithCreator": "",
//       "createdForDob": "",
//       "kycStatus": ""
//   },
//   "totalDonations": 0,
//   "topDonations": null,
//   "message": ""
// }

const desktopStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const mobileStyle = {
  // padding: "0px 20px",
};

export default function CampaignDetails({ data, isMobile }) {
  const [userData, setUserData] = useState({});
  const isNgo = Cookies.get("userType") == "ngo";
  const userCode = Cookies.get("userCode") || null;

  useEffect(() => {
    if (userCode) {
      if (isNgo) {
        getNgoUserDetails()
          .then((res) => res.json())
          .then((json) => {
            console.log("user ngo details", json);
            if (json.success) {
              setUserData(json.ngoUserDetail);
            } else {
              // window.location.href = "/500";
            }
          });
      } else {
        getUserDetails()
          .then((res) => res.json())
          .then((json) => {
            if (json.success) {
              setUserData(json.userDetail);
            } else {
              // window.location.href = "/500";
            }
          });
      }
    } else {
      setUserData({});
    }
  }, [userCode]);

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
              userData={userData}
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
  console.log("context id", context.query.id);

  let apiResponse = await getCampaignById(context.query.id);
  console.log("apiResponse...", apiResponse);
  let apiJson = await apiResponse.json();
  console.log("apiResp", apiJson);

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
        bannerImg: apiJson.campaignDetail.campaignImages,
        bannerHeadline: apiJson.campaignDetail.campaignName,
        bannerDescription: apiJson.campaignDetail.description,
        totalAmount: apiJson.campaignDetail.targetAmount,
        collectedAmount: apiJson.campaignDetail.consolidatedAmountRaised,
        numberOfSupporters: apiJson.campaignDetail.totalDonationsCount,
        beneficiaryName: apiJson.campaignDetail.createdFor,
        campaignStartDate: apiJson.campaignDetail.campaignStartDate,
        campaignEndDate: apiJson.campaignDetail.campaignEndDate,
        campaignCode: context.query.id,
      },
    },
    {
      componentId: "2",
      componentName: "CampaignStory",
      props: {
        title: "The <span>Story</span>",
        story: apiJson.campaignDetail.story,
      },
    },
    {
      componentId: "3",
      componentName: "AboutCampaign",
      props: {
        title: "About the <span>Campaign</span>",
        documentsTitle: "Supporting <span>Documents</span>",
        createdBy: apiJson.campaignDetail.createdByUser.fullName,
        createdFor: apiJson.campaignDetail.createdFor,
        highestDonations: apiJson.topDonations || [], // move to api
        supportingDocs: apiJson.campaignDetail.supportingDocuments,
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
