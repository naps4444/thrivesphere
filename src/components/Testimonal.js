"use client"; // Ensure it runs on the client side

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Testimonial = () => {
  return (
    <div className="bg-[#154E59] py-10 overflow-visible relative xl:container mx-auto">

<h1 className="gradient-border text-[18px]  lg:text-xl xl:text-2xl 2xl:text-3xl -mt-6 mb-6 text-center w-[160px] lg:w-[230px] lg:py-[2px] text-white mx-auto">HAPPY CLIENTS</h1>


      {/* Floating SVGs - Positioned Above the Whole Section */}
      <div className="absolute top-[59px] topd  left-1/2 -translate-x-1/2 flex justify-between w-8/12 z-20 md:hidden">
        <Image src="/qu1.svg" alt="quotation" width={50} height={50} className="w-6 h-6" />
        <Image src="/qu2.svg" alt="quotation" width={50} height={50} className="w-6 h-6" />
      </div>

      

      {/* Mobile View: Swiper Carousel */}
      <div className="block md:hidden relative">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <div className="relative w-10/12 bg-[#EEE6DE] text-center py-4 pt-8 rounded-t-lg mx-auto px-2">
              <p className="mx-auto w-10/12">
                Before working with Nduka, I felt lost in my career. His coaching helped me rediscover my passion and gain the confidence to start my own business.
              </p>
              <h2 className="mt-2 text-[14px] font-bold">JANNY HILLS - Entrepreneur</h2>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative w-10/12 bg-[#EEE6DE] text-center py-4 pt-8 rounded-t-lg mx-auto px-2">
              <p className="mx-auto w-10/12">
                Nduka helped me develop a clear vision for my life and gave me the tools to stay consistent. My personal and professional growth has been remarkable.
              </p>
              <h2 className="mt-2 text-[14px] font-bold">MARK JOHNSON - Graphic Designer</h2>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative w-10/12 bg-[#EEE6DE] text-center py-4 pt-8 rounded-t-lg mx-auto px-2">
              <p className="mx-auto w-10/12">
                I used to struggle with self-doubt. Nduka’s guidance has completely changed my perspective, and I’ve since landed my dream job!
              </p>
              <h2 className="mt-2 text-[14px] font-bold">LISA ROBERTS - Software Engineer</h2>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative w-10/12 bg-[#EEE6DE] text-center py-4 pt-8 rounded-t-lg mx-auto px-2">
              <p className="mx-auto w-10/12">
                The coaching sessions helped me overcome my fear of public speaking, and I now lead my team with confidence.
              </p>
              <h2 className="mt-2 text-[14px] font-bold">ALEX SMITH - Project Manager</h2>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative w-10/12 bg-[#EEE6DE] text-center py-4 pt-8 rounded-t-lg mx-auto px-2">
              <p className="mx-auto w-10/12">
                I used to procrastinate a lot, but thanks to Nduka’s structured approach, I’ve built better habits and improved my productivity.
              </p>
              <h2 className="mt-2 text-[14px] font-bold">SOPHIA CARTER - Digital Marketer</h2>
            </div>
          </SwiperSlide>

          <SwiperSlide>
      <div className="relative w-10/12 bg-[#EEE6DE] text-center py-4 pt-8 rounded-t-lg mx-auto px-2">
        <p className="mx-auto w-10/12">
          Before coaching with Nduka, I felt stuck in my career. He helped me redefine my goals and develop the confidence to step up in my leadership role.
        </p>
        <h2 className="mt-2 text-[14px] font-bold">SOPHIA CARTER - Marketing Strategist</h2>
      </div>
    </SwiperSlide>

    <SwiperSlide>
      <div className="relative w-10/12 bg-[#EEE6DE] text-center py-4 pt-8 rounded-t-lg mx-auto px-2">
        <p className="mx-auto w-10/12">
          I was overwhelmed managing my startup, but Nduka’s coaching provided me with structure and accountability. My business has grown significantly.
        </p>
        <h2 className="mt-2 text-[14px] font-bold">DANIEL OWENS - Small Business Owner</h2>
      </div>
    </SwiperSlide>

    <SwiperSlide>
      <div className="relative w-10/12 bg-[#EEE6DE] text-center py-4 pt-8 rounded-t-lg mx-auto px-2">
        <p className="mx-auto w-10/12">
          I struggled with workplace stress and work-life balance. Nduka’s strategies helped me establish boundaries and lead with confidence.
        </p>
        <h2 className="mt-2 text-[14px] font-bold">JASMINE LEE - HR Director</h2>
      </div>
    </SwiperSlide>
        </Swiper>
      </div>

      {/*large screen*/}
      <div className="hidden md:flex gap-6 md:py-4 scroll-container px-10">

        {/* Testimonial Card 1 */}
        <div className="relative w-[40%] min-w-[40%] md:w-[30%] md:min-w-[30%] lg:w-[25%] lg:min-w-[25%] bg-[#EEE6DE] text-center py-4 pt-8 rounded-lg flex-shrink-0">
          <div className="absolute -top-4 left-4">
            <Image src="/qu1.svg" alt="quotation" width={30} height={30} />
          </div>
          <div className="absolute -top-4 right-4">
            <Image src="/qu2.svg" alt="quotation" width={30} height={30} />
          </div>
          <p className="mx-auto w-10/12">
            I was stuck in a toxic work environment, but Nduka helped me navigate a career transition that changed my life!
          </p>
          <h2 className="mt-2 text-[18px] font-bold">DAVID CARTER - HR Consultant</h2>
        </div>

        {/* Testimonial Card 2 */}
        <div className="relative w-[40%] min-w-[40%] md:w-[30%] md:min-w-[30%] lg:w-[25%] lg:min-w-[25%] bg-[#EEE6DE] text-center py-4 pt-8 rounded-lg flex-shrink-0">
          <div className="absolute -top-4 left-4">
            <Image src="/qu1.svg" alt="quotation" width={30} height={30} />
          </div>
          <div className="absolute -top-4 right-4">
            <Image src="/qu2.svg" alt="quotation" width={30} height={30} />
          </div>
          <p className="mx-auto w-10/12">
            Thanks to Nduka, I’ve improved my time management skills, and my business has grown tremendously.
          </p>
          <h2 className="mt-2 text-[18px] font-bold">NATASHA REED - Small Business Owner</h2>
        </div>

        {/* Testimonial Card 3 */}
        <div className="relative w-[40%] min-w-[40%] md:w-[30%] md:min-w-[30%] lg:w-[25%] lg:min-w-[25%] bg-[#EEE6DE] text-center py-4 pt-8 rounded-lg flex-shrink-0">
          <div className="absolute -top-4 left-4">
            <Image src="/qu1.svg" alt="quotation" width={30} height={30} />
          </div>
          <div className="absolute -top-4 right-4">
            <Image src="/qu2.svg" alt="quotation" width={30} height={30} />
          </div>
          <p className="mx-auto w-10/12">
            Nduka’s mindset coaching transformed how I approach challenges, both in my career and personal life.
          </p>
          <h2 className="mt-2 text-[18px] font-bold">JASON RIVERA - Financial Analyst</h2>
        </div>

        {/* Testimonial Card 4 */}
        <div className="relative w-[40%] min-w-[40%] md:w-[30%] md:min-w-[30%] lg:w-[25%] lg:min-w-[25%] bg-[#EEE6DE] text-center py-4 pt-8 rounded-lg flex-shrink-0">
          <div className="absolute -top-4 left-4">
            <Image src="/qu1.svg" alt="quotation" width={30} height={30} />
          </div>
          <div className="absolute -top-4 right-4">
            <Image src="/qu2.svg" alt="quotation" width={30} height={30} />
          </div>
          <p className="mx-auto w-10/12">
            I was overwhelmed with work-life balance, but Nduka gave me practical strategies to take control of my schedule.
          </p>
          <h2 className="mt-2 text-[18px] font-bold">EMILY WATSON - School Teacher</h2>
        </div>

        <div className="relative w-[40%] min-w-[40%] md:w-[30%] md:min-w-[30%] lg:w-[25%] lg:min-w-[25%] bg-[#EEE6DE] text-center py-4 pt-8 rounded-lg flex-shrink-0">
          <div className="absolute -top-4 left-4">
            <Image src="/qu1.svg" alt="quotation" width={30} height={30} />
          </div>
          <div className="absolute -top-4 right-4">
            <Image src="/qu2.svg" alt="quotation" width={30} height={30} />
          </div>
          <p className="mx-auto w-10/12">Before coaching with Nduka, I felt stuck in my career. He helped me redefine my goals and develop the confidence to step up in my leadership role.</p>
    <h2 className="mt-2 text-[18px] font-bold">SOPHIA CARTER - Marketing Strategist</h2>
        </div>

        <div className="relative w-[40%] min-w-[40%] md:w-[30%] md:min-w-[30%] lg:w-[25%] lg:min-w-[25%] bg-[#EEE6DE] text-center py-4 pt-8 rounded-lg flex-shrink-0">
          <div className="absolute -top-4 left-4">
            <Image src="/qu1.svg" alt="quotation" width={30} height={30} />
          </div>
          <div className="absolute -top-4 right-4">
            <Image src="/qu2.svg" alt="quotation" width={30} height={30} />
          </div>
          <p className="mx-auto w-10/12">I was overwhelmed managing my startup, but Nduka’s coaching provided me with structure and accountability. My business has grown significantly.</p>
    <h2 className="mt-2 text-[18px] font-bold">DANIEL OWENS - Small Business Owner</h2>
        </div>

        <div className="relative w-[40%] min-w-[40%] md:w-[30%] md:min-w-[30%] lg:w-[25%] lg:min-w-[25%] bg-[#EEE6DE] text-center py-4 pt-8 rounded-lg flex-shrink-0">
          <div className="absolute -top-4 left-4">
            <Image src="/qu1.svg" alt="quotation" width={30} height={30} />
          </div>
          <div className="absolute -top-4 right-4">
            <Image src="/qu2.svg" alt="quotation" width={30} height={30} />
          </div>
          <p className="mx-auto w-10/12">I struggled with workplace stress and work-life balance. Nduka’s strategies helped me establish boundaries and lead with confidence.</p>
    <h2 className="mt-2 text-[18px] font-bold">JASMINE LEE - HR Director</h2>
        </div>




      </div>
    </div>
  );
};

export default Testimonial;
