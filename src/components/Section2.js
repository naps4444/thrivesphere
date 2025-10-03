"use client";

import React, { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, useAnimation, useInView } from "framer-motion";
import "swiper/css";
import clsx from "clsx";

function ImageWithSkeleton({ src, alt, width, height, className }) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className="relative flex flex-col items-center">
      {!loaded && (
        <div
          style={{ width, height }}
          className="bg-gray-300 animate-pulse rounded-md mb-2"
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={clsx(
          className,
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0 absolute"
        )}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
}

const Section2 = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const inView = useInView(containerRef, { amount: 0.3 });

  useImperativeHandle(ref, () => ({
    getImages: () => [],
    getBgUrls: () => ["/sec3bg.svg"],
  }));

  // Animate in/out based on viewport
  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1, ease: "easeOut", staggerChildren: 0.3 },
      });
    } else {
      controls.start({
        opacity: 0.5,
        y: -20,
        scale: 0.95,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    }
  }, [inView, controls]);

  // Variants for child items
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <motion.div
      ref={containerRef}
      animate={controls}
      initial="hidden"
      className="xl:container mx-auto py-8"
    >
      {/* Carousel for sm to md screens */}
      <div className="block md:hidden bg-[url('/sec3bg.svg')] bg-cover bg-center py-20 text-white">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="w-full"
        >
          {[
            {
              icon: "/iconsec3.svg",
              title: "CERTIFIED EXPERTISE",
              text: "ThriveSphere's coaches are trained professionals with proven strategies to help you overcome challenges, gain clarity, and achieve lasting transformation.",
            },
            {
              icon: "/iconsec1.svg",
              title: "REWARDING RESULTS",
              text: "Real progress, real transformation. Our coaching empowers you to break barriers, build confidence, and create meaningful lasting change.",
            },
            {
              icon: "/iconsec2.svg",
              title: "PERSONALIZED CARE",
              text: "Your journey is unique, and so is our approach. We tailor every session to your needs, goals, and personal growth.",
            },
          ].map((item, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                className="flex flex-col items-center gap-2"
                variants={itemVariants}
                initial="hidden"
                animate={controls}
              >
                <ImageWithSkeleton src={item.icon} alt="icon" width={50} height={50} className="w-10" />
                <h1 className="text-center text-lg font-semibold text-[22px] font-cinzel">
                  {item.title}
                </h1>
                <p className="text-center w-4/5 mx-auto text-sm font-volkhov tracking-widest md:tracking-normal">
                  {item.text}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Grid layout for lg screens */}
      <div className="hidden md:grid md:grid-cols-3 xl:gap-14 justify-between bg-[url('/sec3bg.svg')] bg-cover bg-center py-14 px-8 text-white">
        {[
          {
            icon: "/iconsec3.svg",
            title: "CERTIFIED EXPERTISE",
            text: "ThriveSphere's coaches are trained professionals with proven strategies to help you overcome challenges, gain clarity, and achieve lasting transformation.",
            marginTop: "mt-0",
          },
          {
            icon: "/iconsec1.svg",
            title: "REWARDING RESULTS",
            text: "Real progress, real transformation. Our coaching empowers you to break barriers, build confidence, and create meaningful lasting change.",
            marginTop: "mt-[140px] lg:mt-[200px]",
          },
          {
            icon: "/iconsec2.svg",
            title: "PERSONALIZED CARE",
            text: "Your journey is unique, and so is our approach. We tailor every session to your needs, goals, and personal growth.",
            marginTop: "mt-0",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className={`flex flex-col items-center gap-2 lg:w-[340px] 2xl:w-[450px] xl:gap-6 ${item.marginTop}`}
            variants={itemVariants}
            initial="hidden"
            animate={controls}
          >
            <ImageWithSkeleton src={item.icon} alt="icon" width={50} height={50} className="w-10 xl:w-14" />
            <h1 className="text-center text-lg font-semibold text-[20px] xl:text-[26px] 2xl:text-[38px] font-cinzel">
              {item.title}
            </h1>
            <p className="text-center w-full lg:text-xl xl:text-2xl lg:w-4/5 xl:w-full mx-auto text-sm xl:leading-normal font-volkhov">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

export default Section2;
