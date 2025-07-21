import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BlinkBlur } from "react-loading-indicators";

const ServiceCard = ({ title, description, image, alt, handleBookNow, onImageLoad }) => {
  const blurDataURL = image.replace(".svg", "low.png");

  return (
    <div className="text-white p-6 rounded-lg shadow-lg w-full sm:w-[300px] mx-auto md:w-[210px] lg:w-[290px] xl:w-[370px] 2xl:w-[450px] flex flex-col">
      <Image
        src={`/${image}`}
        alt={alt}
        height={500}
        width={500}
        placeholder="blur"
        blurDataURL={`/${blurDataURL}`}
        className="w-full mx-auto"
        onLoadingComplete={onImageLoad}
      />
      <h1 className="text-center md:text-[18px] lg:text-[20px] xl:text-[25px] mt-5 md:font-semibold font-cinzel">
        {title}
      </h1>
      <p className="text-center font-rakkas tracking-wide flex-1 my-4 lg:text-xl">
        {description}
      </p>
      <button
        onClick={handleBookNow}
        className="mt-auto px-6 py-2 border-[#CCC193] border-[1px] mx-auto w-full text-[#FFFFFF] bg-[#154E59] font-cinzel transition-all duration-300 ease-in-out hover:bg-[#CCC193] hover:text-black hover:border-black hover:scale-105"
      >
        BOOK NOW
      </button>
    </div>
  );
};

const Services = () => {
  const router = useRouter();
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [timeoutDone, setTimeoutDone] = useState(false);
  const totalImages = 3;

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutDone(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleBookNow = () => {
    router.push("/services/Services");
  };

  const services = [
    {
      title: "CAREER DEVELOPMENT",
      description:
        "Unlock your true potential and build a fulfilling career with expert guidance. Gain clarity, confidence, and strategies to navigate challenges, seize opportunities, and achieve long-term professional success. Your future starts now.",
      image: "carr123.svg",
      alt: "man in suit",
    },
    {
      title: "PERSONAL GROWTH",
      description:
        "Transform into the best version of yourself. Break free from self-doubt, embrace confidence, and develop a growth mindset that fuels success, happiness, and fulfillment in all aspects of life. You deserve more.",
      image: "pre123.svg",
      alt: "woman practicing yoga",
    },
    {
      title: "EMOTIONAL WELL-BEING",
      description:
        "Find balance, inner peace, and emotional strength. Learn to manage stress, overcome fears, and cultivate resilience with expert support. Prioritize your mental and emotional health to live a more fulfilling, joyful life.",
      image: "imgg33.svg",
      alt: "peaceful woman with a flower",
    },
  ];

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const allLoaded = imagesLoaded >= totalImages || timeoutDone;

  return (
    <div className="relative mx-auto xl:container">
      {/* 🔄 Fullscreen Loader using BlinkBlur */}
      {!allLoaded && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-70 flex items-center justify-center">
          <BlinkBlur
            color="#154E59"
            size="medium"
            text="ThriveSphere"
            textColor="#154E59"
          />
        </div>
      )}

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
              title={service.title}
              description={service.description}
              image={service.image}
              alt={service.alt}
              handleBookNow={handleBookNow}
              onImageLoad={handleImageLoad}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
