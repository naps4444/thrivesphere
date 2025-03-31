"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Section2 = () => {
  return (
    <div className="xl:container mx-auto py-8">
      {/* Carousel for sm to md screens */}
      <div className="block md:hidden bg-[url('/sec3bg.svg')] bg-cover bg-center py-20 text-white">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="w-full"
        >
          <SwiperSlide>
            <div className="flex flex-col items-center gap-2">
              <Image src="/iconsec3.svg" alt="icon" height={50} width={50} className="w-10" />
              <h1 className="text-center text-lg font-semibold text-[22px] font-cinzel">CERTIFIED EXPERTISE</h1>
              <p className="text-center w-4/5 mx-auto text-sm font-volkhov tracking-widest md:tracking-normal">
                Our coaches are trained professionals with proven strategies to help you overcome challenges, gain clarity, and achieve lasting transformation.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col items-center gap-2">
              <Image src="/iconsec1.svg" alt="icon" height={50} width={50} className="w-10" />
              <h1 className="text-center text-lg font-semibold text-[22px] font-cinzel">REWARDING RESULTS</h1>
              <p className="text-center w-4/5 mx-auto text-sm font-volkhov tracking-widest md:tracking-normal">
                Real progress, real transformation. Our coaching empowers you to break barriers, build confidence, and create meaningful lasting change.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col items-center gap-2">
              <Image src="/iconsec2.svg" alt="icon" height={50} width={50} className="w-10" />
              <h1 className="text-center text-lg font-semibold text-[22px] font-cinzel">PERSONALIZED CARE</h1>
              <p className="text-center w-4/5 mx-auto text-sm font-volkhov tracking-widest md:tracking-normal">
                Your journey is unique, and so is our approach. We tailor every session to your needs, goals, and personal growth.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Grid layout for lg screens */}
      <div className="hidden md:grid md:grid-cols-3 xl:gap-14 justify-between  bg-[url('/sec3bg.svg')] bg-cover bg-center py-14 px-8 text-white">
        <div className="flex flex-col items-center gap-2 lg:w-[340px] 2xl:w-[450px] xl:gap-3">
          <Image src="/iconsec3.svg" alt="icon" height={50} width={50} className="w-10 xl:w-14" />
          <h1 className="text-center text-lg font-semibold text-[20px] xl:text-[26px] 2xl:text-[38px] font-cinzel">CERTIFIED EXPERTISE</h1>
          <p className="text-center w-full lg:text-xl xl:text-2xl lg:w-4/5 xl:w-full  mx-auto text-sm xl:leading-normal font-volkhov">
            Our coaches are trained professionals with proven strategies to help you overcome challenges, gain clarity, and achieve lasting transformation.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 mt-[140px] 2xl:w-[420px] lg:mt-[200px] lg:w-[350px] xl:gap-6">
          <Image src="/iconsec1.svg" alt="icon" height={50} width={50} className="w-10 xl:w-14" />
          <h1 className="text-center text-lg font-semibold text-[20px] xl:text-[26px] 2xl:text-[38px] font-cinzel">REWARDING RESULTS</h1>
          <p className="text-center lg:text-xl xl:text-2xl w-full  lg:w-4/5 xl:w-full mx-auto text-sm xl:leading-normal font-volkhov">
            Real progress, real transformation. Our coaching empowers you to break barriers, build confidence, and create meaningful lasting change.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 lg:w-[340px] 2xl:w-[450px] xl:gap-6">
          <Image src="/iconsec2.svg" alt="icon" height={50} width={50} className="w-10 xl:w-14" />
          <h1 className="text-center text-lg font-semibold text-[20px] xl:text-[26px] 2xl:text-[30px] font-cinzel">PERSONALIZED CARE</h1>
          <p className="text-center w-full lg:text-xl xl:text-2xl lg:w-4/5 xl:w-full  mx-auto text-sm xl:leading-normal font-volkhov ">
            Your journey is unique, and so is our approach. We tailor every session to your needs, goals, and personal growth.
          </p>
        </div>
      </div>
    </div>
    
  );
};

export default Section2;
