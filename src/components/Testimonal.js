"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

// Individual Testimonial Card with animation
const TestimonialCard = ({ text, author }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 20,
        transition: { duration: 0.4, ease: "easeIn" },
      });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: 20 }}
      className="relative w-[40%] min-w-[40%] md:w-[30%] md:min-w-[30%] lg:w-[25%] lg:min-w-[25%] bg-[#EEE6DE] text-center py-4 pt-8 rounded-lg flex-shrink-0"
    >
      <div className="absolute -top-4 left-4">
        <Image src="/qu1.svg" alt="quotation" width={30} height={30} />
      </div>
      <div className="absolute -top-4 right-4">
        <Image src="/qu2.svg" alt="quotation" width={30} height={30} />
      </div>
      <p className="mx-auto w-10/12 font-cinzel">{text}</p>
      <h2 className="mt-2 text-[18px] font-bold font-volkhov">{author}</h2>
    </motion.div>
  );
};

const Testimonial = () => {
  // All testimonial data
  const testimonials = [
    {
      text: "I was stuck in a toxic work environment, but Nduka helped me navigate a career transition that changed my life!",
      author: "DAVID CARTER - HR Consultant",
    },
    {
      text: "Thanks to Nduka, I’ve improved my time management skills, and my business has grown tremendously.",
      author: "NATASHA REED - Small Business Owner",
    },
    {
      text: "Nduka’s mindset coaching transformed how I approach challenges, both in my career and personal life.",
      author: "JASON RIVERA - Financial Analyst",
    },
    {
      text: "I was overwhelmed with work-life balance, but Nduka gave me practical strategies to take control of my schedule.",
      author: "EMILY WATSON - School Teacher",
    },
    {
      text: "Before coaching with Nduka, I felt stuck in my career. He helped me redefine my goals and develop the confidence to step up in my leadership role.",
      author: "SOPHIA CARTER - Marketing Strategist",
    },
    {
      text: "I was overwhelmed managing my startup, but Nduka’s coaching provided me with structure and accountability. My business has grown significantly.",
      author: "DANIEL OWENS - Small Business Owner",
    },
    {
      text: "I struggled with workplace stress and work-life balance. Nduka’s strategies helped me establish boundaries and lead with confidence.",
      author: "JASMINE LEE - HR Director",
    },
  ];

  return (
    <div className="bg-[#154E59] py-10 overflow-visible relative xl:container mx-auto">
      <h1 className="gradient-border text-[18px] lg:text-xl xl:text-2xl 2xl:text-3xl -mt-6 mb-6 text-center w-[160px] lg:w-[230px] lg:py-[2px] text-white mx-auto">
        HAPPY CLIENTS
      </h1>

      {/* Floating SVGs - Mobile Only */}
      <div className="absolute top-[59px] left-1/2 -translate-x-1/2 flex justify-between w-8/12 z-20 md:hidden">
        <Image src="/qu1.svg" alt="quotation" width={50} height={50} className="w-6 h-6" />
        <Image src="/qu2.svg" alt="quotation" width={50} height={50} className="w-6 h-6" />
      </div>

      {/* Mobile Swiper Carousel */}
      <div className="block md:hidden relative">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-10/12 bg-[#EEE6DE] text-center py-4 pt-8 rounded-t-lg mx-auto px-2">
                <p className="mx-auto w-10/12 font-cinzel">{t.text}</p>
                <h2 className="mt-2 text-[14px] font-bold font-volkhov">{t.author}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid with Animation */}
      <div className="hidden md:flex gap-6 md:py-4 scroll-container px-10">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} text={t.text} author={t.author} />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
