import React from "react";
import Styles from "./index.module.scss";
import ColorTitle from "@/sharedComponents/ColorTitle";
import Carousel from "@/Widgets/Carousel";
import Image from "next/image";

function Reviews({ data, name, isMobile }) {
  return (
    <section id={name} className={Styles.container}>
      <ColorTitle text={data.title} />
      <Carousel
        // navigation={isMobile ? false : true}
        isMobile={isMobile}
        slidesToShow={isMobile ? 1.1 : 3}
      >
        {data?.reviews?.map((item, idx) => {
          return (
            <div key={idx} className={Styles.container__card}>
              <div className={Styles.container__card__imgNameContainer}>
                <Image
                  src="https://kettocdn.gumlet.io/media/banner/0/97/image/50e08ce31ef3bfa184cadd9ec164b8ecee8bb0f0.jpg?w=auto&dpr=2.0"
                  width={80}
                  height={80}
                  style={{ borderRadius: "50%" }}
                />
                <span>{item.name}</span>
              </div>
              <p>{item.review}</p>
            </div>
          );
        })}
      </Carousel>
      {/* <div className={Styles.container__card}>
        <Image
          src="https://kettocdn.gumlet.io/media/banner/0/97/image/50e08ce31ef3bfa184cadd9ec164b8ecee8bb0f0.jpg?w=auto&dpr=2.0"
          width={80}
          height={80}
          style={{ borderRadius: "50%" }}
        />
        <span>Reviewer Name</span>
        <p>
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum
        </p>
      </div> */}
    </section>
  );
}

export default Reviews;
