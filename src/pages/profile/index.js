import React, { useEffect, useState } from "react";
import Header from "@/sharedComponents/Header";
import Footer from "@/sharedComponents/Footer";
import Profile from "@/sharedComponents/Profile";
import detectDevice from "@/utils/detectDevice";
import { getNgoUserDetails, getUserDetails } from "@/services/login";
import Cookies from "js-cookie";

export default function ProfilePage({ data, isMobile }) {
  const [userData, setUserData] = useState({});
  const isNgo = Cookies.get("userType") == "ngo";

  useEffect(() => {
    if (isNgo) {
      getNgoUserDetails()
        .then((res) => res.json())
        .then((json) => {
          console.log("user ngo details", json);
          if (json.success) {
            setUserData(json.ngoUserDetail);
          } else {
            window.location.href = "/500";
          }
        });
    } else {
      getUserDetails()
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            setUserData(json.userDetail);
          } else {
            window.location.href = "/500";
          }
        });
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      id="root"
    >
      <Header isMobile={isMobile} />
      <Profile
        userData={userData}
        setUserData={setUserData}
        isMobile={isMobile}
      />
      {/* <Footer /> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  //All supporters API needed onClick
  const userAgent = context.req.headers["user-agent"];
  // console.log("userAgent--", detectDevice(userAgent));
  const isMobile = detectDevice(userAgent);

  let data = {};

  if (context.req.cookies["userCode"]) {
    // await getUserDetails()
    //   .then((res) => res.json())
    //   .then((json) => {
    //     if (json.success) {
    //       console.log("success api", json);
    //       data = { user: json.userDetail };
    //       return { props: { data, isMobile } };
    //     } else {
    //       return {
    //         redirect: {
    //           permanent: false,
    //           destination: "/500",
    //         },
    //         props: {},
    //       };
    //     }
    //   });
    return { props: { data: [], isMobile } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login?redirectTo=/profile",
      },
      props: {},
    };
  }
}
