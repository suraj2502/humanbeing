import Head from "next/head";
import Image from "next/image";
import homeSections from "@/specificPageSectionList/home";
import Header from "@/sharedComponents/Header";
import Footer from "@/sharedComponents/Footer";
import detectDevice from "@/utils/detectDevice";
import AuthModal from "@/sharedComponents/AuthModal";
import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { cookies } from "next/headers";

export default function Home({ data, isMobile, redirectToParam }) {
  console.log("data", data, isMobile);
  const [isOpen, setIsOpen] = useState(false);

  //   const sections = data.map((section) => {
  //     return {
  //       // eslint-disable-next-line no-underscore-dangle
  //       id: section.componentId,
  //       data: section.props,
  //       ui: homeSections[section.componentName] || null,
  //       name: section.componentName,
  //     };
  //   });

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = (flag) => {
    if (flag === false) {
      if (redirectToParam) {
        window.location.href = redirectToParam;
      } else {
        window.location.href = "/";
      }
    }
  };

  return (
    <div id="root">
      {isOpen && (
        <AuthModal
          showCloseButton={false}
          isMobile={isMobile}
          isOpen={isOpen}
          setIsOpen={closeModal}
        />
      )}
      {/* {console.log("homeSections", homeSections)}
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
      <Footer /> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const userAgent = context.req.headers["user-agent"];
  // console.log("userAgent--", detectDevice(userAgent));
  const isMobile = detectDevice(userAgent);
  // Fetch data from external API

  //   const { req, res } = context;
  console.log(
    "Cookie on login",
    context.req.cookies["userCode"],
    context.query.redirectTo
  );

  const redirectToParam = context.query.redirectTo || '/';
  if (context.req.cookies["userCode"]) {
    if (context.query.redirectTo) {
      return {
        redirect: {
          permanent: false,
          destination: `${context.query.redirectTo}`,
        },
        props: {},
      };
      //   return redirect(`${context.query.redirectTo}`);
      // res.writeHead(301, { Location: `${req.query.redirectTo}` });
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
    }
  } else {
    return { props: { data: [], isMobile, redirectToParam } };
  }
  // Pass data to the page via props
}
