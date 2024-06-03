import Header from "@/sharedComponents/Header";
import Footer from "@/sharedComponents/Footer";
import FundraiserForm from "@/sharedComponents/FundraiserForm";
import detectDevice from "@/utils/detectDevice";
import FundraiserModal from "@/sharedComponents/FundraiserModal";
import { useEffect, useState } from "react";

export default function Fundraiser({ data , isMobile}) {
  console.log("data", data);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleFundraiserModalComplete = (val) => {
    if (val === false) {
      window.location.href = "/profile";
    }
  };

  return (
    <div id="root">
      {/* <Header /> */}
      {isOpen && (
        <FundraiserModal
          isMobile={isMobile}
          isOpen={isOpen}
          setIsOpen={handleFundraiserModalComplete}
        />
      )}
      {/* <Footer /> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const userAgent = context.req.headers["user-agent"];
  // console.log("userAgent--", detectDevice(userAgent));
  const isMobile = detectDevice(userAgent);

  if (context.req.cookies["userCode"]) {
    return { props: { data: [], isMobile } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login?redirectTo=/fundraiser",
      },
      props: {},
    };
  }

  // Pass data to the page via props
}
