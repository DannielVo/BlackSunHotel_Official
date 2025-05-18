import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { assets, SLIDES } from "../../../assets/assets";
import "./slider.css";

const Slider = () => {
  return (
    <>
      <section className="slider-section">
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          loop={true}
          centeredSlides={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="slider"
        >
          <div className="slider-container">
            {SLIDES.map((item, index) => (
              <SwiperSlide className="slide" key={`slide ${index}`}>
                <img src={item} alt={`Image ${index + 1}`} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </section>
    </>
  );
};

export default Slider;
