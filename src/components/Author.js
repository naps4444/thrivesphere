import Image from "next/image";
import { motion } from "framer-motion";

// Fade-in and slide-up animation
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Author = () => {
  return (
    <div className="xl:container mx-auto py-4 relative">
      {/* Frame 4 */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <Image
          src="/frame4.svg"
          alt="bg"
          height={100}
          width={100}
          className="absolute right-0"
        />
      </motion.div>

      <div className="flex w-11/12 mx-auto justify-between lg:mt-20">
        {/* Left images */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="relative xl:my-auto w-5/12 xl:ml-12 xl:w-4/12 hidden lg:block"
        >
          <Image
            src="/frame1.svg"
            alt="bg"
            height={100}
            width={100}
            className="relative w-44 xl:w-48"
          />
          <Image
            src="/frame2.svg"
            alt="bg"
            height={100}
            width={100}
            className="absolute top-14 lg:top-16 w-44 xl:w-48 left-20"
          />

          {/* Frame3 with repeating shake animation */}
          <motion.div
            initial={{ x: 0 }}
            whileInView={{ x: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }} // triggers every time in view
            className="absolute top-24 w-80 xl:w-[360px] left-12"
          >
            <Image
              src="/frame3img.svg"
              alt="bg"
              height={100}
              width={100}
              className="w-full"
            />
          </motion.div>
        </motion.div>

        {/* Right content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="relative px-6 lg:w-5/12 xl:w-5/12 2xl:w-6/12 mb-4 flex lg:mr-[80px]"
        >
          <Image
            src="/spark.svg"
            alt="star"
            height={100}
            width={100}
            className="absolute w-8 lg:w-12 top-[28px] lg:top-[0px] right-0 lg:-right-[90px]"
          />

          <div className="my-auto">
            <h1 className="mt-8 text-base 2xl:text-xl font-cinzel">ABOUT</h1>
            <h1 className="mt-4 font-cinzel lg:text-[36px] font-bold tracking-wide leading-relaxed">
              NDUKA (ND) AHILAKA
            </h1>

            <div className="flex flex-col gap-4 mt-2 font-volkhov lg:text-xl xl:text-2xl 2xl:text-3xl">
              <p>
                Nduka is a dedicated transformational life and wellness coach
                with a deep passion for personal growth and development.
              </p>
              <p>
                ND is a father of two daughters and a husband, employed with
                the Nova Scotia government in a human rights position.
              </p>
              <p>
                Having overcome his own challenges, Nduka empathizes with those
                feeling lost or uncertain, providing a supportive, nonjudgmental
                space for exploration and growth.
              </p>
              <p>
                Whether supporting career-driven professionals or individuals
                seeking personal transformation, Nduka is committed to fostering
                long-term growth and empowerment.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Author;
