"use client";

import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import clsx from "clsx";

// ServiceCard with forwarded ref
const ServiceCard = forwardRef(({ title, description, image, alt, handleBookNow }, ref) => {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef(null);
  const blurDataURL = image.replace(".svg", "low.png");

  useImperativeHandle(ref, () => ({
    getImages: () => [imageRef.current],
    getBgUrls: () => [], // Add background URLs here if needed in the future
  }));

  return (
    <div className="text-white p-6 rounded-lg shadow-lg w-full sm:w-[300px] mx-auto md:w-[210px] lg:w-[290px] xl:w-[370px] 2xl:w-[450px] flex flex-col relative">
      {/* Skeleton Placeholder */}
      {!loaded && (
        <div className="w-full h-[250px] bg-gray-300 animate-pulse rounded-md mb-4" />
      )}

      {/* Actual Image */}
      <Image
        ref={imageRef}
        src={`/${image}`}
        alt={alt}
        height={500}
        width={500}
        placeholder="blur"
        blurDataURL={`/${blurDataURL}`}
        className={clsx(
          "w-full h-auto mx-auto rounded-md transition-opacity duration-500 mb-4",
          loaded ? "opacity-100 relative" : "opacity-0 absolute"
        )}
        onLoadingComplete={() => setLoaded(true)}
      />

      {/* Title */}
      <h1 className="text-center md:text-[18px] lg:text-[20px] xl:text-[25px] mt-5 md:font-semibold font-cinzel">
        {title}
      </h1>

      {/* Description */}
      <p className="text-center font-rakkas tracking-wide flex-1 my-4 lg:text-xl">
        {description}
      </p>

      {/* CTA Button */}
      <button
        onClick={handleBookNow}
        className="mt-auto px-6 py-2 border-[#CCC193] border-[1px] mx-auto w-full text-[#FFFFFF] bg-[#154E59] font-cinzel transition-all duration-300 ease-in-out hover:bg-[#CCC193] hover:text-black hover:border-black hover:scale-105"
      >
        BOOK NOW
      </button>
    </div>
  );
});

// Services wrapper with forwarded ref to expose all images
const Services = forwardRef((props, ref) => {
  const router = useRouter();
  const cardRefs = useRef([]);

  const handleBookNow = () => {
    router.push("/services/Services");
  };

  const services = [
    {
      title: "CAREER DEVELOPMENT",
      description:
        "Unlock your true potential and build a fulfilling career with expert guidance. Gain clarity, confidence, and strategies to navigate challenges, seize opportunities, and achieve long-term professional success. Your future starts now.",
      image: "carr123.jpg",
      alt: "man in suit",
    },
    {
      title: "PERSONAL GROWTH",
      description:
        "Transform into the best version of yourself. Break free from self-doubt, embrace confidence, and develop a growth mindset that fuels success, happiness, and fulfillment in all aspects of life. You deserve more.",
      image: "pre123.jpg",
      alt: "woman practicing yoga",
    },
    {
      title: "EMOTIONAL WELL-BEING",
      description:
        "Find balance, inner peace, and emotional strength. Learn to manage stress, overcome fears, and cultivate resilience with expert support. Prioritize your mental and emotional health to live a more fulfilling, joyful life.",
      image: "imgg33.jpg",
      alt: "peaceful woman with a flower",
    },
  ];

  useImperativeHandle(ref, () => ({
    getImages: () =>
      cardRefs.current.flatMap((card) => card?.getImages?.() || []),
    getBgUrls: () =>
      cardRefs.current.flatMap((card) => card?.getBgUrls?.() || []),
  }));

  return (
    <div className="relative mx-auto xl:container">
      {/* Section Title */}
      <div className="flex justify-between pb-6 md:pb-10 md:pt-6 px-4 lg:px-10">
        <Image
          src="/leftic.svg"
          alt="left icon"
          width={100}
          height={100}
          className="w-4 md:w-6 lg:w-8 xl:w-10 2xl:w-14"
        />
        <div className="flex justify-center flex-col items-center">
          <Image
            src="/midic.svg"
            alt="middle icon"
            width={100}
            height={100}
            className="w-4 md:w-6 lg:w-8 xl:w-10 2xl:w-14"
          />
          <h1 className="text-[14px] md:text-[16px] lg:text-[20px] font-bold xl:text-[26px] 2xl:text-[38px] font-cinzel">
            SERVICES MADE JUST FOR YOU
          </h1>
        </div>
        <Image
          src="/rightic.svg"
          alt="right icon"
          width={100}
          height={100}
          className="w-4 md:w-6 lg:w-8 xl:w-10 2xl:w-14"
        />
      </div>

      {/* Service Cards */}
      <div className="bg-[#154E59] py-14 pb-28">
        <div className="flex flex-col gap-4 xl:gap-10 justify-between md:flex-row px-4 mx-auto lg:px-10 xl:container text-white">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              title={service.title}
              description={service.description}
              image={service.image}
              alt={service.alt}
              handleBookNow={handleBookNow}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default Services;
