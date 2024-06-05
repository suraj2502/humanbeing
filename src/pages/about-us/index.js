import Header from "@/sharedComponents/Header";
import Footer from "@/sharedComponents/Footer";
import detectDevice from "@/utils/detectDevice";
import Styles from "./index.module.scss";
import ColorTitle from "@/sharedComponents/ColorTitle";

export default function AboutUs({ data, isMobile }) {
  console.log("data", data, isMobile);

  return (
    <div id="root">
      <Header isMobile={isMobile} />
      <div className={Styles.container}>
        <ColorTitle text="About <span>Us</span>" />
        <p className={Styles.container__description}>{data.description}</p>
        <ul className={Styles.container__pointers}>
          {data.pointers.map((item, idx) => {
            return <li key={idx}>{item}</li>;
          })}
        </ul>
        <div className={Styles.container__additional}>
          <ColorTitle text={data.additional.heading} />
          <p className={Styles.container__additional__content}>
            {data.additional.content}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const userAgent = context.req.headers["user-agent"];
  const isMobile = detectDevice(userAgent);

  const data = {
    description:
      "Through our multifaceted platform, we aspire to empower individuals and communities to collaboratively address and overcome diverse social challenges on a global scale.",
    pointers: [
      "Leveraging technology for positive change",
      "Empowering global collaboration",
      "Addressing diverse social challenges",
    ],
    additional: {
      heading: "Donate With <span>Heart</span>",
      content:
        "Altruvo isn't just about connecting donors with worthy causes; our platform also bridges the gap between NGOs and a diverse network of individuals ready to make a difference",
    },
  };

  // Pass data to the page via props
  return { props: { data, isMobile } };
}
