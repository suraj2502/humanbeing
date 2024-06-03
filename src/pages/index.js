import Head from "next/head";
import Image from "next/image";
import homeSections from "@/specificPageSectionList/home";
import Header from "@/sharedComponents/Header";
import Footer from "@/sharedComponents/Footer";
import detectDevice from "@/utils/detectDevice";
import { getAllCampaigns } from "@/services/homepage";

export default function Home({ data, isMobile }) {
  console.log("data", data, isMobile);

  const sections = data.map((section) => {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: section.componentId,
      data: section.props,
      ui: homeSections[section.componentName] || null,
      name: section.componentName,
    };
  });

  return (
    <div id="root">
      {console.log("homeSections", homeSections)}
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
      {/* <Footer /> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const userAgent = context.req.headers["user-agent"];
  // console.log("userAgent--", detectDevice(userAgent));
  const isMobile = detectDevice(userAgent);
  // Fetch data from external API
  // const res = [
  //   {
  //     componentId: "1",
  //     componentName: "HomeBanner",
  //     props: {
  //       bannerImg: "",
  //       bannerHeadline: "Uniting Hearts, Funding Hope",
  //       bannerDescription:
  //         "Elevate your impact through our Free Crowdfunding platform",
  //       ctaText: "Request a callback",
  //     },
  //   },
  //   {
  //     componentId: "2",
  //     componentName: "DonationsGrid",
  //     props: {
  //       title: "Open <span>Donations</span>",
  //       donations: [
  //         {
  //           bannerImg: "",
  //           createdOn: "27 June, 2021",
  //           donationCount: 1099,
  //           title: "Tsunami in Nepal",
  //           goalAmount: 100000,
  //           recievedAmount: 25000,
  //           creatorName: "Shukla Suraj",
  //         },
  //         {
  //           bannerImg: "",
  //           createdOn: "27 June, 2021",
  //           donationCount: 1099,
  //           title:
  //             "Tsunami in Nepal Tsunami in Nepal Tsunami in Nepal Tsunami in Nepal",
  //           goalAmount: 100000,
  //           recievedAmount: 25000,
  //           creatorName: "Shukla Suraj",
  //         },
  //         {
  //           bannerImg: "",
  //           createdOn: "27 June, 2021",
  //           donationCount: 1099,
  //           title: "Tsunami in Nepal",
  //           goalAmount: 100000,
  //           recievedAmount: 25000,
  //           creatorName: "Shukla Suraj",
  //         },
  //         {
  //           bannerImg: "",
  //           createdOn: "27 June, 2021",
  //           donationCount: 1099,
  //           title: "Tsunami in Nepal",
  //           goalAmount: 100000,
  //           recievedAmount: 25000,
  //           creatorName: "Shukla Suraj",
  //         },
  //         {
  //           bannerImg: "",
  //           createdOn: "27 June, 2021",
  //           donationCount: 1099,
  //           title: "Tsunami in Nepal",
  //           goalAmount: 100000,
  //           recievedAmount: 25000,
  //           creatorName: "Shukla Suraj",
  //         },
  //         {
  //           bannerImg: "",
  //           createdOn: "27 June, 2021",
  //           donationCount: 1099,
  //           title: "Tsunami in Nepal",
  //           goalAmount: 100000,
  //           recievedAmount: 25000,
  //           creatorName: "Shukla Suraj",
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     componentId: "3",
  //     componentName: "CallbackBanner",
  //     props: {},
  //   },
  //   {
  //     componentId: "4",
  //     componentName: "Reviews",
  //     props: {
  //       title: "Our <span>Reviews</span>",
  //       reviews: [
  //         {
  //           imgUrl: "",
  //           name: "Dr.Vivek Billempelly",
  //           review:
  //             "I've had the privilege of witnessing the incredible work that HumanBeing does for our community. Their unwavering commitment to social change and their ability to connect with people from all walks of life is truly inspiring. Our community is better because of them.",
  //         },
  //         {
  //           imgUrl: "",
  //           name: "Mr.Birendra Kumar Thapliyal",
  //           review:
  //             "As a parent, finding someone like HumanBeing is a true source of comfort when it comes to safeguarding your child's welfare. Their remarkable talent for building connections across generations and extending a helping hand precisely when it's most needed is incredibly reassuring.",
  //         },
  //         {
  //           imgUrl: "",
  //           name: "Mohan Deshmukh",
  //           review:
  //             "HumanBeing is a lifeline for those in need. I've been part of campaigns that saved lives, filled empty stomachs, and sent children to school. It's a place where compassion and generosity change lives, one campaign at a time.",
  //         },
  //         {
  //           imgUrl: "",
  //           name: "Mr.Khalil Khan",
  //           review:
  //             "Through HumanBeing, I've seen the incredible power of collective kindness in the face of medical crises. It's where hearts unite to provide support, comfort, and access to life-changing medical care.",
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     componentId: "5",
  //     componentName: "FAQ",
  //     props: {
  //       title: "Frequently Asked <span>Questions</span>",
  //       faqs: [
  //         {
  //           question: "Question 1",
  //           answer: "Answer 1",
  //         },
  //         {
  //           question: "Question 2",
  //           answer: "Answer 2",
  //         },
  //         {
  //           question: "Question 3",
  //           answer: "Answer 3",
  //         },
  //         {
  //           question: "Question 4",
  //           answer: "Answer 4",
  //         },
  //         {
  //           question: "Question 5",
  //           answer: "Answer 5",
  //         },
  //       ],
  //     },
  //   },
  // ];
  // homePageData();
  // const data = await homePageData();
  const homeRes = [
    {
      componentId: "1",
      componentName: "HomeBanner",
      props: {
        bannerImg: "",
        bannerHeadline: "Uniting Hearts, Funding Hope",
        bannerDescription:
          "Elevate your impact through our Free Crowdfunding platform",
        ctaText: "Request a callback",
      },
    },
    {
      componentId: "2",
      componentName: "DonationsGrid",
      props: {
        title: "Open <span>Donations</span>",
        donations: [
          {
            bannerImg: "",
            createdOn: "27 June, 2021",
            donationCount: 1099,
            title: "Tsunami in Nepal",
            goalAmount: 100000,
            recievedAmount: 25000,
            creatorName: "Shukla Suraj",
          },
          {
            bannerImg: "",
            createdOn: "27 June, 2021",
            donationCount: 1099,
            title:
              "Tsunami in Nepal Tsunami in Nepal Tsunami in Nepal Tsunami in Nepal",
            goalAmount: 100000,
            recievedAmount: 25000,
            creatorName: "Shukla Suraj",
          },
          {
            bannerImg: "",
            createdOn: "27 June, 2021",
            donationCount: 1099,
            title: "Tsunami in Nepal",
            goalAmount: 100000,
            recievedAmount: 25000,
            creatorName: "Shukla Suraj",
          },
          {
            bannerImg: "",
            createdOn: "27 June, 2021",
            donationCount: 1099,
            title: "Tsunami in Nepal",
            goalAmount: 100000,
            recievedAmount: 25000,
            creatorName: "Shukla Suraj",
          },
          {
            bannerImg: "",
            createdOn: "27 June, 2021",
            donationCount: 1099,
            title: "Tsunami in Nepal",
            goalAmount: 100000,
            recievedAmount: 25000,
            creatorName: "Shukla Suraj",
          },
          {
            bannerImg: "",
            createdOn: "27 June, 2021",
            donationCount: 1099,
            title: "Tsunami in Nepal",
            goalAmount: 100000,
            recievedAmount: 25000,
            creatorName: "Shukla Suraj",
          },
        ],
      },
    },
    {
      componentId: "3",
      componentName: "CallbackBanner",
      props: {},
    },
    {
      componentId: "4",
      componentName: "Reviews",
      props: {
        title: "Our <span>Reviews</span>",
        reviews: [
          {
            imgUrl: "",
            name: "Dr.Vivek Billempelly",
            review:
              "I've had the privilege of witnessing the incredible work that HumanBeing does for our community. Their unwavering commitment to social change and their ability to connect with people from all walks of life is truly inspiring. Our community is better because of them.",
          },
          {
            imgUrl: "",
            name: "Mr.Birendra Kumar Thapliyal",
            review:
              "As a parent, finding someone like HumanBeing is a true source of comfort when it comes to safeguarding your child's welfare. Their remarkable talent for building connections across generations and extending a helping hand precisely when it's most needed is incredibly reassuring.",
          },
          {
            imgUrl: "",
            name: "Mohan Deshmukh",
            review:
              "HumanBeing is a lifeline for those in need. I've been part of campaigns that saved lives, filled empty stomachs, and sent children to school. It's a place where compassion and generosity change lives, one campaign at a time.",
          },
          {
            imgUrl: "",
            name: "Mr.Khalil Khan",
            review:
              "Through HumanBeing, I've seen the incredible power of collective kindness in the face of medical crises. It's where hearts unite to provide support, comfort, and access to life-changing medical care.",
          },
        ],
      },
    },
    {
      componentId: "5",
      componentName: "FAQ",
      props: {
        title: "Frequently Asked <span>Questions</span>",
        faqs: [
          {
            question: "Question 1",
            answer: "Answer 1",
          },
          {
            question: "Question 2",
            answer: "Answer 2",
          },
          {
            question: "Question 3",
            answer: "Answer 3",
          },
          {
            question: "Question 4",
            answer: "Answer 4",
          },
          {
            question: "Question 5",
            answer: "Answer 5",
          },
        ],
      },
    },
  ];
  // let donationsMock = [
  //   {
  //     campaignCode: "160000000001",
  //     campaignName: "Test",
  //     description: "Test",
  //     story: "",
  //     campaignSource: "",
  //     campaignCategory: "Education",
  //     campaignType: "",
  //     status: "Active",
  //     campaignStartDate: "2024-04-29T00:00:00+05:30",
  //     campaignEndDate: "2024-05-02T00:00:00+05:30",
  //     campaignGoal: "",
  //     consolidatedAmountRaised: 0,
  //     targetAmount: 10000,
  //     campaignImages: [
  //       "https://cimages.milaap.org/milaap/image/upload/c_fill,h_452,w_603/v1709715941/production/images/campaign/761952/eon1zt5id1zdjmolewrj_1709715964.jpg",
  //     ],
  //     supportingDocuments: [
  //       "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
  //       "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
  //     ],
  //     kycDocuments: [],
  //     campaignVideo: "",
  //     campaignLocation: "",
  //     currency: "INR",
  //     progressPercentage: 0,
  //     inrTaxExempt: false,
  //     coverImageUrl: "",
  //     allowListingOnAltruvo: false,
  //     createdByUser: {
  //       userCode: "150000000006",
  //       fullName: "AJ ",
  //       phoneNumber: "91-8840392169",
  //     },
  //     createdFor: "",
  //     createdOn: "2024-04-28T09:38:09+05:30",
  //     modifiedOn: "2024-04-28T09:38:09+05:30",
  //     campaignUpdatedBy: "",
  //     campaignIsVerified: false,
  //     campaignIsApproved: false,
  //     isExpired: false,
  //     isClosed: false,
  //     totalDonationsCount: 0,
  //     isActive: true,
  //     pocName: "",
  //     pocPhoneNumber: "-",
  //     patientRelationCategoryWithCreator: "Myself",
  //     patientRelationTypeWithCreator: "",
  //     createdForDob: "",
  //   },
  //   {
  //     campaignCode: "160000000001",
  //     campaignName: "Test",
  //     description: "Test",
  //     story: "",
  //     campaignSource: "",
  //     campaignCategory: "Education",
  //     campaignType: "",
  //     status: "Active",
  //     campaignStartDate: "2024-04-29T00:00:00+05:30",
  //     campaignEndDate: "2024-05-02T00:00:00+05:30",
  //     campaignGoal: "",
  //     consolidatedAmountRaised: 0,
  //     targetAmount: 10000,
  //     campaignImages: [
  //       "https://cimages.milaap.org/milaap/image/upload/c_fill,h_452,w_603/v1709715941/production/images/campaign/761952/eon1zt5id1zdjmolewrj_1709715964.jpg",
  //     ],
  //     supportingDocuments: [
  //       "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
  //       "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
  //     ],
  //     kycDocuments: [],
  //     campaignVideo: "",
  //     campaignLocation: "",
  //     currency: "INR",
  //     progressPercentage: 0,
  //     inrTaxExempt: false,
  //     coverImageUrl: "",
  //     allowListingOnAltruvo: false,
  //     createdByUser: {
  //       userCode: "150000000006",
  //       fullName: "AJ ",
  //       phoneNumber: "91-8840392169",
  //     },
  //     createdFor: "",
  //     createdOn: "2024-04-28T09:38:09+05:30",
  //     modifiedOn: "2024-04-28T09:38:09+05:30",
  //     campaignUpdatedBy: "",
  //     campaignIsVerified: false,
  //     campaignIsApproved: false,
  //     isExpired: false,
  //     isClosed: false,
  //     totalDonationsCount: 0,
  //     isActive: true,
  //     pocName: "",
  //     pocPhoneNumber: "-",
  //     patientRelationCategoryWithCreator: "Myself",
  //     patientRelationTypeWithCreator: "",
  //     createdForDob: "",
  //   },
  //   {
  //     campaignCode: "160000000001",
  //     campaignName: "Test",
  //     description: "Test",
  //     story: "",
  //     campaignSource: "",
  //     campaignCategory: "Education",
  //     campaignType: "",
  //     status: "Active",
  //     campaignStartDate: "2024-04-29T00:00:00+05:30",
  //     campaignEndDate: "2024-05-02T00:00:00+05:30",
  //     campaignGoal: "",
  //     consolidatedAmountRaised: 0,
  //     targetAmount: 10000,
  //     campaignImages: [
  //       "https://cimages.milaap.org/milaap/image/upload/c_fill,h_452,w_603/v1709715941/production/images/campaign/761952/eon1zt5id1zdjmolewrj_1709715964.jpg",
  //     ],
  //     supportingDocuments: [
  //       "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
  //       "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
  //     ],
  //     kycDocuments: [],
  //     campaignVideo: "",
  //     campaignLocation: "",
  //     currency: "INR",
  //     progressPercentage: 0,
  //     inrTaxExempt: false,
  //     coverImageUrl: "",
  //     allowListingOnAltruvo: false,
  //     createdByUser: {
  //       userCode: "150000000006",
  //       fullName: "AJ ",
  //       phoneNumber: "91-8840392169",
  //     },
  //     createdFor: "",
  //     createdOn: "2024-04-28T09:38:09+05:30",
  //     modifiedOn: "2024-04-28T09:38:09+05:30",
  //     campaignUpdatedBy: "",
  //     campaignIsVerified: false,
  //     campaignIsApproved: false,
  //     isExpired: false,
  //     isClosed: false,
  //     totalDonationsCount: 0,
  //     isActive: true,
  //     pocName: "",
  //     pocPhoneNumber: "-",
  //     patientRelationCategoryWithCreator: "Myself",
  //     patientRelationTypeWithCreator: "",
  //     createdForDob: "",
  //   },
  //   {
  //     campaignCode: "160000000001",
  //     campaignName: "Test",
  //     description: "Test",
  //     story: "",
  //     campaignSource: "",
  //     campaignCategory: "Education",
  //     campaignType: "",
  //     status: "Active",
  //     campaignStartDate: "2024-04-29T00:00:00+05:30",
  //     campaignEndDate: "2024-05-02T00:00:00+05:30",
  //     campaignGoal: "",
  //     consolidatedAmountRaised: 0,
  //     targetAmount: 10000,
  //     campaignImages: [
  //       "https://cimages.milaap.org/milaap/image/upload/c_fill,h_452,w_603/v1709715941/production/images/campaign/761952/eon1zt5id1zdjmolewrj_1709715964.jpg",
  //     ],
  //     supportingDocuments: [
  //       "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
  //       "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
  //     ],
  //     kycDocuments: [],
  //     campaignVideo: "",
  //     campaignLocation: "",
  //     currency: "INR",
  //     progressPercentage: 0,
  //     inrTaxExempt: false,
  //     coverImageUrl: "",
  //     allowListingOnAltruvo: false,
  //     createdByUser: {
  //       userCode: "150000000006",
  //       fullName: "AJ ",
  //       phoneNumber: "91-8840392169",
  //     },
  //     createdFor: "",
  //     createdOn: "2024-04-28T09:38:09+05:30",
  //     modifiedOn: "2024-04-28T09:38:09+05:30",
  //     campaignUpdatedBy: "",
  //     campaignIsVerified: false,
  //     campaignIsApproved: false,
  //     isExpired: false,
  //     isClosed: false,
  //     totalDonationsCount: 0,
  //     isActive: true,
  //     pocName: "",
  //     pocPhoneNumber: "-",
  //     patientRelationCategoryWithCreator: "Myself",
  //     patientRelationTypeWithCreator: "",
  //     createdForDob: "",
  //   },
  //   {
  //     campaignCode: "160000000001",
  //     campaignName: "Test",
  //     description: "Test",
  //     story: "",
  //     campaignSource: "",
  //     campaignCategory: "Education",
  //     campaignType: "",
  //     status: "Active",
  //     campaignStartDate: "2024-04-29T00:00:00+05:30",
  //     campaignEndDate: "2024-05-02T00:00:00+05:30",
  //     campaignGoal: "",
  //     consolidatedAmountRaised: 0,
  //     targetAmount: 10000,
  //     campaignImages: [
  //       "https://cimages.milaap.org/milaap/image/upload/c_fill,h_452,w_603/v1709715941/production/images/campaign/761952/eon1zt5id1zdjmolewrj_1709715964.jpg",
  //     ],
  //     supportingDocuments: [
  //       "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
  //       "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
  //     ],
  //     kycDocuments: [],
  //     campaignVideo: "",
  //     campaignLocation: "",
  //     currency: "INR",
  //     progressPercentage: 0,
  //     inrTaxExempt: false,
  //     coverImageUrl: "",
  //     allowListingOnAltruvo: false,
  //     createdByUser: {
  //       userCode: "150000000006",
  //       fullName: "AJ ",
  //       phoneNumber: "91-8840392169",
  //     },
  //     createdFor: "",
  //     createdOn: "2024-04-28T09:38:09+05:30",
  //     modifiedOn: "2024-04-28T09:38:09+05:30",
  //     campaignUpdatedBy: "",
  //     campaignIsVerified: false,
  //     campaignIsApproved: false,
  //     isExpired: false,
  //     isClosed: false,
  //     totalDonationsCount: 0,
  //     isActive: true,
  //     pocName: "",
  //     pocPhoneNumber: "-",
  //     patientRelationCategoryWithCreator: "Myself",
  //     patientRelationTypeWithCreator: "",
  //     createdForDob: "",
  //   },
  //   {
  //     campaignCode: "160000000001",
  //     campaignName: "Test",
  //     description: "Test",
  //     story: "",
  //     campaignSource: "",
  //     campaignCategory: "Education",
  //     campaignType: "",
  //     status: "Active",
  //     campaignStartDate: "2024-04-29T00:00:00+05:30",
  //     campaignEndDate: "2024-05-02T00:00:00+05:30",
  //     campaignGoal: "",
  //     consolidatedAmountRaised: 0,
  //     targetAmount: 10000,
  //     campaignImages: [
  //       "https://cimages.milaap.org/milaap/image/upload/c_fill,h_452,w_603/v1709715941/production/images/campaign/761952/eon1zt5id1zdjmolewrj_1709715964.jpg",
  //     ],
  //     supportingDocuments: [
  //       "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
  //       "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
  //     ],
  //     kycDocuments: [],
  //     campaignVideo: "",
  //     campaignLocation: "",
  //     currency: "INR",
  //     progressPercentage: 0,
  //     inrTaxExempt: false,
  //     coverImageUrl: "",
  //     allowListingOnAltruvo: false,
  //     createdByUser: {
  //       userCode: "150000000006",
  //       fullName: "AJ ",
  //       phoneNumber: "91-8840392169",
  //     },
  //     createdFor: "",
  //     createdOn: "2024-04-28T09:38:09+05:30",
  //     modifiedOn: "2024-04-28T09:38:09+05:30",
  //     campaignUpdatedBy: "",
  //     campaignIsVerified: false,
  //     campaignIsApproved: false,
  //     isExpired: false,
  //     isClosed: false,
  //     totalDonationsCount: 0,
  //     isActive: true,
  //     pocName: "",
  //     pocPhoneNumber: "-",
  //     patientRelationCategoryWithCreator: "Myself",
  //     patientRelationTypeWithCreator: "",
  //     createdForDob: "",
  //   },
  //   {
  //     campaignCode: "160000000001",
  //     campaignName: "Test",
  //     description: "Test",
  //     story: "",
  //     campaignSource: "",
  //     campaignCategory: "Education",
  //     campaignType: "",
  //     status: "Active",
  //     campaignStartDate: "2024-04-29T00:00:00+05:30",
  //     campaignEndDate: "2024-05-02T00:00:00+05:30",
  //     campaignGoal: "",
  //     consolidatedAmountRaised: 0,
  //     targetAmount: 10000,
  //     campaignImages: [
  //       "https://cimages.milaap.org/milaap/image/upload/c_fill,h_452,w_603/v1709715941/production/images/campaign/761952/eon1zt5id1zdjmolewrj_1709715964.jpg",
  //     ],
  //     supportingDocuments: [
  //       "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
  //       "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0",
  //     ],
  //     kycDocuments: [],
  //     campaignVideo: "",
  //     campaignLocation: "",
  //     currency: "INR",
  //     progressPercentage: 0,
  //     inrTaxExempt: false,
  //     coverImageUrl: "",
  //     allowListingOnAltruvo: false,
  //     createdByUser: {
  //       userCode: "150000000006",
  //       fullName: "AJ ",
  //       phoneNumber: "91-8840392169",
  //     },
  //     createdFor: "",
  //     createdOn: "2024-04-28T09:38:09+05:30",
  //     modifiedOn: "2024-04-28T09:38:09+05:30",
  //     campaignUpdatedBy: "",
  //     campaignIsVerified: false,
  //     campaignIsApproved: false,
  //     isExpired: false,
  //     isClosed: false,
  //     totalDonationsCount: 0,
  //     isActive: true,
  //     pocName: "",
  //     pocPhoneNumber: "-",
  //     patientRelationCategoryWithCreator: "Myself",
  //     patientRelationTypeWithCreator: "",
  //     createdForDob: "",
  //   },
  // ];

  await getAllCampaigns({
    pageSize: 6,
    offset: 0,
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.success) {
        homeRes[1].props.donations = json.campaignListingDetail;
        return homeRes;
      } else {
        homeRes[1].props.donations = [];
        return homeRes;
      }
    });

  // Pass data to the page via props
  return { props: { data: homeRes, isMobile } };
}
