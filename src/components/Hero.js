"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useRef, useImperativeHandle, forwardRef } from "react";

const Hero = forwardRef((props, ref) => {
  const router = useRouter();
  const [imgLoaded, setImgLoaded] = useState(false);
  const heroImageRef = useRef(null);

  const handleNavigation = () => {
    router.push("/services/Services");
  };

  useImperativeHandle(ref, () => ({
    getImages: () => [heroImageRef.current],
    getBgUrls: () => ["/hero-bg.jpg"], // if using background images, list here
  }));

  return (
    <div className="xl:container mx-auto font-cinzel">
      <div className="grid md:grid-cols-2">
        <div className="bg-[#154E59] flex flex-col gap-4 xl:gap-6 p-4 lg:pl-10 py-6 lg:py-8 relative">
          <Image
            src="/staricon.svg"
            alt="star icon"
            width={40}
            height={50}
            className="absolute left-7 lg:left-12 xl:top-10"
          />
          <h1 className="text-[#CCC193] lg:mt-8 mt-7 xl:mt-10 lg:w-11/12 xl:w-full font-semibold">
            NAVIGATE LIFE WITH PURPOSE AND TRANSFORM YOUR MINDSET TODAY
          </h1>

          <p className="text-[#FFFFFF] lg:w-11/12 tracking-widest md:tracking-normal">
            FEELING STUCK OR UNCERTAIN? OUR EXPERT LIFE AND WELLNESS COACHING
            SERVICES HELP YOU GAIN CLARITY, BUILD CONFIDENCE, AND BREAK THROUGH
            LIMITATIONS. TAKE CONTROL OF YOUR FUTURE AND START CREATING A LIFE
            YOU TRULY LOVE.
          </p>

          <button
            onClick={handleNavigation}
            className="px-6 py-2 border-[#CCC193] border-[1px] md:w-3/6 lg:w-2/6 text-[#FFFFFF] transition-all duration-300 ease-in-out hover:bg-[#CCC193] hover:text-black hover:border-black hover:scale-105"
          >
            BOOK NOW
          </button>
        </div>

        <div className="bg-[#CCD0DC] flex items-center justify-center relative min-h-[400px]">
          {!imgLoaded && (
            <div className="absolute w-full h-full bg-gray-300 animate-pulse rounded" />
          )}

          <Image
            ref={heroImageRef}
            src="/heroimg2.svg"
            alt="ceo thrivesphere"
            height={100}
            width={100}
            className={`w-full transition-opacity duration-500 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoadingComplete={() => setImgLoaded(true)}
            priority
          />
        </div>
      </div>
    </div>
  );
});

export default Hero;
