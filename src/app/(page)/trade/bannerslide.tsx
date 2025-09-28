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
          delay: 10000,
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
                "linear-gradient(#2a356aa2, #ffc4002a), url('https://images.pexels.com/photos/7567440/pexels-photo-7567440.jpeg')",
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="banner-slide bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(#2a356aa2, #ffc4002a), url('https://images.pexels.com/photos/6771427/pexels-photo-6771427.jpeg')",
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="banner-slide bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(#2a356aa2, #ffc4002a), url('https://images.pexels.com/photos/6770775/pexels-photo-6770775.jpeg')",
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="banner-slide bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(#2a356aa2, #ffc4002a), url('https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg')",
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="banner-slide bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(#2a356aa2, #ffc4002a), url('https://images.pexels.com/photos/5833309/pexels-photo-5833309.jpeg')",
            }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
