"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function Bannerslide() {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        rewind={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="banner-slide bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(#2a356aa2, #ffc4002a), url('/slide/slide1.jpg')",
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="banner-slide bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(#2a356aa2, #ffc4002a), url('/slide/slide2.jpg')",
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="banner-slide bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(#2a356aa2, #ffc4002a), url('/slide/slide3.jpg')",
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="banner-slide bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(#2a356aa2, #ffc4002a), url('/slide/slide4.jpg')",
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="banner-slide bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(#2a356aa2, #ffc4002a), url('/slide/slide5.jpg')",
            }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
