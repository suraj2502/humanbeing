import Head from "next/head";
import Image from "next/image";
import homeSections from "@/specificPageSectionList/home";
import Header from "@/sharedComponents/Header";
import Footer from "@/sharedComponents/Footer";

export default function Home({ data }) {
  console.log("data", data);

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
      {/* <Header /> */}
      {sections.map((item) => {
        const Section = item.ui;
        console.log("tem.data", item.data);
        return Section ? (
          <Section data={item.data} name={item.name} id={item.id} />
        ) : null;
      })}
      {/* <Footer /> */}
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = [
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
    // {
    //   componentId: "2",
    //   componentName: "DonationsGrid",
    //   props: {
    //     title: "Open <span>Donations</span>",
    //     donations: [
    //       {
    //         bannerImg: "",
    //         createdOn: "27 June, 2021",
    //         donationCount: 1099,
    //         title: "Tsunami in Nepal",
    //         goalAmount: 100000,
    //         recievedAmount: 25000,
    //         creatorName: "Shukla Suraj",
    //       },
    //       {
    //         bannerImg: "",
    //         createdOn: "27 June, 2021",
    //         donationCount: 1099,
    //         title:
    //           "Tsunami in Nepal Tsunami in Nepal Tsunami in Nepal Tsunami in Nepal",
    //         goalAmount: 100000,
    //         recievedAmount: 25000,
    //         creatorName: "Shukla Suraj",
    //       },
    //       {
    //         bannerImg: "",
    //         createdOn: "27 June, 2021",
    //         donationCount: 1099,
    //         title: "Tsunami in Nepal",
    //         goalAmount: 100000,
    //         recievedAmount: 25000,
    //         creatorName: "Shukla Suraj",
    //       },
    //       {
    //         bannerImg: "",
    //         createdOn: "27 June, 2021",
    //         donationCount: 1099,
    //         title: "Tsunami in Nepal",
    //         goalAmount: 100000,
    //         recievedAmount: 25000,
    //         creatorName: "Shukla Suraj",
    //       },
    //       {
    //         bannerImg: "",
    //         createdOn: "27 June, 2021",
    //         donationCount: 1099,
    //         title: "Tsunami in Nepal",
    //         goalAmount: 100000,
    //         recievedAmount: 25000,
    //         creatorName: "Shukla Suraj",
    //       },
    //       {
    //         bannerImg: "",
    //         createdOn: "27 June, 2021",
    //         donationCount: 1099,
    //         title: "Tsunami in Nepal",
    //         goalAmount: 100000,
    //         recievedAmount: 25000,
    //         creatorName: "Shukla Suraj",
    //       },
    //     ],
    //   },
    // },
    // {
    //   componentId: "3",
    //   componentName: "CallbackBanner",
    //   props: {},
    // },
    // {
    //   componentId: "4",
    //   componentName: "Reviews",
    //   props: {
    //     title: "Our <span>Reviews</span>",
    //     reviews: [
    //       {
    //         imgUrl: "",
    //         name: "Dr.Vivek Billempelly",
    //         review:
    //           "I've had the privilege of witnessing the incredible work that HumanBeing does for our community. Their unwavering commitment to social change and their ability to connect with people from all walks of life is truly inspiring. Our community is better because of them.",
    //       },
    //       {
    //         imgUrl: "",
    //         name: "Mr.Birendra Kumar Thapliyal",
    //         review:
    //           "As a parent, finding someone like HumanBeing is a true source of comfort when it comes to safeguarding your child's welfare. Their remarkable talent for building connections across generations and extending a helping hand precisely when it's most needed is incredibly reassuring.",
    //       },
    //       {
    //         imgUrl: "",
    //         name: "Mohan Deshmukh",
    //         review:
    //           "HumanBeing is a lifeline for those in need. I've been part of campaigns that saved lives, filled empty stomachs, and sent children to school. It's a place where compassion and generosity change lives, one campaign at a time.",
    //       },
    //       {
    //         imgUrl: "",
    //         name: "Mr.Khalil Khan",
    //         review:
    //           "Through HumanBeing, I've seen the incredible power of collective kindness in the face of medical crises. It's where hearts unite to provide support, comfort, and access to life-changing medical care.",
    //       },
    //     ],
    //   },
    // },
    // {
    //   componentId: "5",
    //   componentName: "FAQ",
    //   props: {
    //     title: "Frequently Asked <span>Questions</span>",
    //     faqs: [
    //       {
    //         question: "Question 1",
    //         answer: "Answer 1",
    //       },
    //       {
    //         question: "Question 2",
    //         answer: "Answer 2",
    //       },
    //       {
    //         question: "Question 3",
    //         answer: "Answer 3",
    //       },
    //       {
    //         question: "Question 4",
    //         answer: "Answer 4",
    //       },
    //       {
    //         question: "Question 5",
    //         answer: "Answer 5",
    //       },
    //     ],
    //   },
    // },
  ];
  const data = res;

  // Pass data to the page via props
  return { props: { data } };
}
