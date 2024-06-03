// import Styles from "./index.module.scss";

// import React, { useRef, useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// import "./index.module.scss";

// // import required modules
// import { Pagination, Navigation } from "swiper/modules";
import NukaCarousel from "nuka-carousel";
import Styles from "./index.module.scss";

// const App = () => {
//   return (
//     <Carousel>
//       <img src="/image1.png" />
//       <img src="/image2.png" />
//       <img src="/image3.png" />
//       <img src="/image4.png" />
//       <img src="/image5.png" />
//     </Carousel>
//   )
// }

function Carousel({
  spaceBetween,
  slidesToShow = 3,
  cellSpacing = 20,
  navigation,
  pagination,
  children,
  isMobile = false,
}) {
  return (
    // <div className={Styles.carousel}>
    //   {navigation && <div>Previous</div>}
    <NukaCarousel
      style={{ position: "relative" }}
      navigation={navigation}
      slidesToShow={slidesToShow}
      cellSpacing={cellSpacing}
      renderBottomCenterControls={false}
      renderCenterLeftControls={
        isMobile
          ? null
          : ({ previousSlide, currentSlide }) => (
              <div
                className={currentSlide === 0 ? "" : Styles.customPrevious}
                onClick={previousSlide}
              ></div>
            )
      }
      renderCenterRightControls={
        isMobile
          ? null
          : ({ nextSlide, currentSlide, slideCount, slidesToShow }) => (
              <div
                className={
                  currentSlide + slidesToShow === slideCount
                    ? ""
                    : Styles.customNext
                }
                onClick={nextSlide}
              ></div>
            )
      }
    >
      {children}
    </NukaCarousel>
  );
}

export default Carousel;
