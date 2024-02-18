import Header from "@/sharedComponents/Header";
import Footer from "@/sharedComponents/Footer";
import FundraiserForm from "@/sharedComponents/FundraiserForm";

export default function Fundraiser({ data }) {
  console.log("data", data);
  return (
    <div id="root">
      {/* <Header /> */}
      <FundraiserForm />
      {/* <Footer /> */}
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = [
    {
      title: "comp 1",
    },
    {
      title: "comp2",
    },
  ];
  const data = res;

  // Pass data to the page via props
  return { props: { data } };
}
