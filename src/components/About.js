"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const About = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const textControls = useAnimation();
  const imageControls = useAnimation();

  const textInView = useInView(textRef, { amount: 0.3 });
  const imageInView = useInView(imageRef, { amount: 0.3 });

  useEffect(() => {
    if (textInView) {
      textControls.start("visible");
    } else {
      textControls.start("hidden");
    }
  }, [textInView, textControls]);

  useEffect(() => {
    if (imageInView) {
      imageControls.start("visible");
    } else {
      imageControls.start("hidden");
    }
  }, [imageInView, imageControls]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <div className="xl:container mx-auto">
      <div className="flex justify-between relative pb-[60px]">
        {/* Text Section */}
        <motion.div
          ref={textRef}
          className="border-l-[40px] lg:border-l-[70px] xl:border-l-[110px] border-[#CCC193] relative text-[#154E59] p-8 md:p-14 flex flex-col gap-6 lg:gap-10 md:w-4/6 xl:w-5/6 md:h-4/5"
          initial="hidden"
          animate={textControls}
          variants={textVariants}
        >
          <Image
            src="/aboutstar.svg"
            alt="star icon"
            height={100}
            width={100}
            className="w-7 top-3 left-2 md:top-6 md:left-5 absolute lg:w-12 lg:top-12 lg:left-10"
          />

          <div className="lg:w-5/6 mx-auto">
            <motion.h1 variants={textVariants} className="mt-4 lg:mt-10 font-cinzel">
              MISSION
            </motion.h1>
            <motion.p variants={textVariants} className="font-rakkas tracking-wide md:tracking-normal lg:text-xl xl:text-2xl 2xl:text-3xl">
              ThriveSphere’s mission is to empower individuals to navigate life with clarity, confidence, and purpose. Through expert coaching, we help clients overcome limitations, develop a growth mindset, and achieve meaningful transformation in their personal and professional lives. Our commitment is to guide individuals toward self-discovery, emotional resilience, and long-term success.
            </motion.p>
          </div>

          <div className="lg:w-5/6 mx-auto">
            <motion.h1 variants={textVariants} className="font-cinzel">
              VISION
            </motion.h1>
            <motion.p variants={textVariants} className="font-rakkas tracking-wide md:tracking-normal lg:text-xl xl:text-2xl 2xl:text-3xl">
              ThriveSphere envisions a world where everyone has the tools and support to unlock their full potential. We aim to be a trusted partner in personal and professional development, fostering a community of confident and purpose-driven individuals. Through personalized coaching, we strive to replace confusion with clarity, doubt with confidence, and make success accessible to all.
            </motion.p>
          </div>

          <div className="lg:w-5/6 mx-auto">
            <motion.h1 variants={textVariants} className="font-cinzel">
              WHY CHOOSE US
            </motion.h1>
            <motion.p variants={textVariants} className="font-rakkas tracking-wide md:tracking-normal lg:text-xl xl:text-2xl 2xl:text-3xl">
              ThriveSphere offers more than traditional coaching. Our certified experts use proven strategies to deliver real results. We personalize our approach to meet individual goals, ensuring tailored guidance. Our focus is on long-term transformation, equipping clients with the mindset, tools, and strategies for lasting change. With a results-driven approach, we help individuals gain clarity, confidence, and actionable steps toward success.
            </motion.p>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          ref={imageRef}
          className="hidden md:block relative"
          initial="hidden"
          animate={imageControls}
          variants={imageVariants}
        >
          <Image
            src="https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751714258/about12_tm1zpf.png"
            alt="guy on top of the hill"
            width={100}
            height={100}
            className="w-[150px] lg:w-[230px] ml-[60px] lg:mr-[60px] mt-2 xl:w-[250px] xl:-ml-[0px] 2xl:w-[320px]"
          />

          <div className="flex relative mt-2 justify-end lg:gap-4">
            <Image
              src="/aboutstar2.svg"
              alt="star icon"
              height={100}
              width={100}
              className="w-6 absolute top-[100px] -left-8 lg:w-9 lg:top-[90px] xl:-left-[80px] 2xl:-left-[40px]"
            />
            <Image
              src="https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751714258/about33_eyddxo.png"
              alt="chess"
              width={100}
              height={100}
              className="w-[140px] lg:w-[200px] mt-[70px] lg:mt-[45px] xl:w-[260px] 2xl:w-[280px]"
            />
            <Image
              src="/about3.svg"
              alt="colour"
              width={100}
              height={100}
              className="h-[220px] lg:h-[250px]"
            />
          </div>

          <Image
            src="https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751714258/about44_fprk1e.png"
            alt="stones"
            width={100}
            height={100}
            className="w-[150px] lg:w-[250px] mt-2 lg:mt-3 ml-[60px] lg:ml-[60px] xl:w-[220px] xl:ml-[50px] 2xl:w-[290px]"
          />
        </motion.div>

        <Link href="/admin/login">
          <div className="absolute bottom-0 left-[50px] xl:left-[205px] 2xl:left-[255px] -translate-x-1/2 w-1/3 h-[30px] lg:h-[40px] bg-[#B37137] cursor-default"></div>
        </Link>
      </div>
    </div>
  );
};

export default About;
