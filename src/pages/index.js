"use client";

import { useEffect, useRef, useState } from "react";
import About from "@/components/About";
import Author from "@/components/Author";
import Hero from "@/components/Hero";
import NewsLetter from "@/components/NewsLetter";
import Numbers from "@/components/Numbers";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Services from "@/components/Services";
import Testimonal from "@/components/Testimonal";
import { BlinkBlur } from "react-loading-indicators";

export default function Home() {
  const heroRef = useRef(null);
  const section2Ref = useRef(null);
  const servicesRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const getImageElements = (ref) => ref?.current?.getImages?.() || [];
      const getBgUrls = (ref) => ref?.current?.getBgUrls?.() || [];

      const imageElements = [
        ...getImageElements(heroRef),
        ...getImageElements(section2Ref),
        ...getImageElements(servicesRef),
      ].filter(Boolean);

      const backgroundUrls = [
        ...getBgUrls(heroRef),
        ...getBgUrls(section2Ref),
        ...getBgUrls(servicesRef),
      ];

      const imagePromises = imageElements.map(
        (img) =>
          new Promise((resolve) => {
            if (img?.complete) {
              resolve();
            } else {
              img.onload = img.onerror = () => resolve();
            }
          })
      );

      const bgPromises = backgroundUrls.map(
        (url) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = img.onerror = () => resolve();
          })
      );

      await Promise.all([...imagePromises, ...bgPromises]);
      setIsLoaded(true);
    };

    preloadImages();
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-[#154E59]">
        <BlinkBlur color="#fff" size="large" text="ThriveSphere" textColor="#fff" />
      </div>
    );
  }

  return (
    <>
      <div id="home">
        <Hero ref={heroRef} />
      </div>
      <Section1 />
      <Section2 ref={section2Ref} />
      <div id="services">
        <Services ref={servicesRef} />
      </div>
      <div id="about">
        <About />
      </div>
      <div>
        <Testimonal />
      </div>
      {/* <Numbers /> */}
      <NewsLetter />
      <Author />
      <div id="contact"></div>
    </>
  );
}
