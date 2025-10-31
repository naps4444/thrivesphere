"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollIndicator from "@/components/ScrollIndicator";

// LoadableImage component
const LoadableImage = ({ src, alt, width, height, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${loaded ? "" : "bg-gray-300 animate-pulse"} ${className}`}
      style={{ display: "inline-block" }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} w-full h-auto`}
      />
    </div>
  );
};

const OurServices = () => {
  const router = useRouter();

  // Map services to their slugs
  const services = [
    { slug: "lets-connect", title: "LET’S CONNECT - 15 MINUTES, COMPLIMENTARY", description: "A quick, judgement-free conversation to understand your needs and explore how coaching can unlock your potential. No commitment just clarity" },
    { slug: "deep-dive", title: "DEEP DIVE - 1 HOUR | $100", description: "A focused, in-depth session designed to help you gain clarity, identify roadblocks, and take meaningful steps toward your goals." },
    { slug: "momentum-package", title: "MOMENTUM PACKAGE - 3 SESSIONS | $260", description: "Transformation doesn’t happen overnight. This package provides consistent support, actionable insights, and a clear path toward your goals." },
  ];

  const handleBooking = (slug) => {
    router.push(`/services/${slug}`);
  };

  return (
    <div className="px- xl:container mx-auto lg:text-xl 2xl:text-2xl">
      <ScrollIndicator style={{ backgroundColor: "#154E59" }} />

      {/* Header */}
      <div className="flex justify-between py-6 pt-10 w-11/12 xl:w-full mx-auto lg:px-10 border-black border-b-[1px] lg:border-b-[2px]">
        <LoadableImage src="/leftic.svg" alt="left icon" width={100} height={100} className="w-4 md:w-6 lg:w-8 xl:w-10 2xl:w-14" />
        <div className="flex justify-center flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
            className="tracking-in-expand text-[14px] md:text-[16px] lg:text-[20px] font-bold xl:text-[26px] 2xl:text-[38px] font-cinzel"
          >
            OUR SERVICES
          </motion.h1>
        </div>
        <LoadableImage src="/rightic.svg" alt="right icon" width={100} height={100} className="w-4 md:w-6 lg:w-8 xl:w-10 2xl:w-14" />
      </div>

      {/* Sections */}
      {services.map((service, index) => (
        <div
          key={service.slug}
          className={`grid md:grid-cols-2 justify-between mt-5 py-4 md:py-10 lg:py-14 px-6 ${index % 2 === 1 ? "bg-[#154E59] text-white" : ""}`}
        >
          {index % 2 === 1 ? (
            <>
              <div className="flex flex-col my-auto gap-4 md:p-10 py-6 lg:p-16 xl:p-24">
                <motion.h1 className="tracking-in-expand text-[20px] lg:text-[26px] xl:text-[30px] 2xl:text-[38px] font-bold text-center md:text-start font-cinzel">
                  {service.title}
                </motion.h1>
                <motion.p className={`font-semibold text-center md:text-start ${index % 2 === 1 ? "font-rakkas text-white" : "font-rakkas text-[#154E59]"}`}>
                  {service.description}
                </motion.p>
                <motion.button
                  onClick={() => handleBooking(service.slug)}
                  className={`w-3/5 mx-auto md:w-[140px] lg:w-[160px] xl:w-[200px] 2xl:w-[250px] xl:py-4 md:mx-0 py-2 ${index % 2 === 1 ? "bg-[#A8781C] text-white" : "bg-[#A8781C] text-white"} font-cinzel hover:scale-105 hover:bg-[#8b5e15]`}
                >
                  BOOK NOW
                </motion.button>
              </div>
              <LoadableImage
                src={`/svv${index + 1}.jpg`}
                alt="smiling woman"
                height={500}
                width={500}
                className={`mx-auto w-full md:w-[400px] xl:w-[500px] 2xl:w-4/5 ${index % 2 === 1 ? "border-white border-[1px] p-[1px]" : "border-black border-[1px] p-[1px]"}`}
              />
            </>
          ) : (
            <>
              <LoadableImage
                src={`/svv${index + 1}.jpg`}
                alt="smiling woman"
                height={500}
                width={500}
                className="mx-auto w-full md:w-[400px] xl:w-[500px] 2xl:w-4/5 border-black border-[1px] p-[1px]"
              />
              <div className="flex flex-col my-auto gap-4 text-[#154E59] md:p-10 py-6 lg:p-16 xl:p-24">
                <motion.h1 className="tracking-in-expand text-[20px] lg:text-[26px] xl:text-[30px] 2xl:text-[38px] font-bold text-center md:text-start font-cinzel">
                  {service.title}
                </motion.h1>
                <motion.p className="font-semibold text-center md:text-start font-rakkas">
                  {service.description}
                </motion.p>
                <motion.button
                  onClick={() => handleBooking(service.slug)}
                  className="w-3/5 mx-auto md:w-[140px] lg:w-[160px] xl:w-[200px] 2xl:w-[250px] xl:py-4 md:mx-0 py-2 bg-[#A8781C] text-white font-cinzel hover:scale-105 hover:bg-[#8b5e15]"
                >
                  BOOK NOW
                </motion.button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default OurServices;
