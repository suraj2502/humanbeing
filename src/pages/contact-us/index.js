import Header from "@/sharedComponents/Header";
import Footer from "@/sharedComponents/Footer";
import detectDevice from "@/utils/detectDevice";
import Styles from "./index.module.scss";
import ColorTitle from "@/sharedComponents/ColorTitle";

export default function ContactUs({ data, isMobile }) {
  console.log("data", data, isMobile);

  return (
    <div id="root">
      <Header isMobile={isMobile} />
      <div className={Styles.container}>
        {data.map((item, idx) => {
          return (
            <div className={Styles.container__category} key={idx}>
              <ColorTitle text={item.title} />
              <span>{item.content}</span>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const userAgent = context.req.headers["user-agent"];
  const isMobile = detectDevice(userAgent);

  const data = [
    {
      title: "Office <span>Address</span>",
      content:
        "1103 Aksansha Opluence, Shakti Nagar, Opposite Traffic Garden, Kota, India - 324009",
    },
    {
      title: "Our <span>Email</span>",
      content: "workaltruvo@gmail.com",
    },
    {
      title: "Contact <span>Number</span>",
      content: "+91-7219747420",
    },
  ];

  // Pass data to the page via props
  return { props: { data, isMobile } };
}
