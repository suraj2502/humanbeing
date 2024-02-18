// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";

// const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  console.log("data", data);
  return <div>domnate</div>;
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
