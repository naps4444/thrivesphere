"use client";

import { motion } from "framer-motion";
import ImageWithSkeleton from "./ImageWithSkeleton";

const Section1 = () => {
  // Variants for staggered animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3, // Headline, paragraph, image will animate in sequence
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const headlineVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-4 lg:gap-5 py-4 md:py-6 bg-white xl:container mx-auto px-4 lg:pb-16 xl:pb-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div variants={imageVariants}>
        <ImageWithSkeleton
          src="/section1vector.svg"
          alt="icon"
          width={100}
          height={100}
          className="w-14 md:w-20 lg:w-28 lg:mt-3"
        />
      </motion.div>

      <motion.h1
        className="font-semibold text-center font-cinzel"
        variants={headlineVariants}
      >
        YOU WERE MEANT FOR MORE, OWN IT!
      </motion.h1>

      <motion.p
        className="mx-auto md:w-7/12 2xl:w-8/12 text-center font-rakkas font-semibold tracking-wide md:tracking-normal lg:text-xl xl:text-2xl"
        variants={paragraphVariants}
      >
        You don’t have to stay stuck. The future you dream of is not far away,
        it’s just beyond your doubts. Let us help you bridge the gap and make it
        your reality.
      </motion.p>
    </motion.div>
  );
};

export default Section1;
