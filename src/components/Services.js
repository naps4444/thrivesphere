import { useRouter } from "next/router";
import Image from "next/image";

const Services = () => {
    const router = useRouter();

    const handleBookNow = () => {
        router.push("/services/Services");
    };

    return (
        <div className="mx-auto xl:container">
            <div className="flex justify-between pb-6 md:pb-10 md:pt-6 px-4 lg:px-10">
                <div>
                    <Image src="/leftic.svg" alt="left icon" width={100} height={100} className="w-4 md:w-6 lg:w-8 xl:w-10 2xl:w-14" />
                </div>

                <div className="flex justify-center flex-col items-center">
                    <Image src="/midic.svg" alt="middle icon" width={100} height={100} className="w-4 md:w-6 lg:w-8 xl:w-10 2xl:w-14" />
                    <h1 className="text-[14px] md:text-[16px] lg:text-[20px] font-bold xl:text-[26px] 2xl:text-[38px] font-cinzel">
                        SERVICES MADE JUST FOR YOU
                    </h1>
                </div>

                <div>
                    <Image src="/rightic.svg" alt="right icon" width={100} height={100} className="w-4 md:w-6 lg:w-8 xl:w-10 2xl:w-14" />
                </div>
            </div>

            <div className="bg-[#154E59] py-14 pb-28">
                <div className="flex flex-col gap-4 xl:gap-10 justify-between md:flex-row px-4 mx-auto lg:px-10 xl:container text-white">
                    
                    {[
                        {
                            title: "CAREER DEVELOPMENT",
                            description: "Unlock your true potential and build a fulfilling career with expert guidance. Gain clarity, confidence, and strategies to navigate challenges, seize opportunities, and achieve long-term professional success. Your future starts now.",
                            image: "imgg1.svg",
                            alt: "man in suit"
                        },
                        {
                            title: "PERSONAL GROWTH",
                            description: "Transform into the best version of yourself. Break free from self-doubt, embrace confidence, and develop a growth mindset that fuels success, happiness, and fulfillment in all aspects of life. You deserve More.",
                            image: "imgg22.svg",
                            alt: "woman practicing yoga"
                        },
                        {
                            title: "EMOTIONAL WELL-BEING",
                            description: "Find balance, inner peace, and emotional strength. Learn to manage stress, overcome fears, and cultivate resilience with expert support. Prioritize your mental and emotional health to live a more fulfilling, joyful life.",
                            image: "imgg33.svg",
                            alt: "peaceful woman with a flower"
                        }
                    ].map((service, index) => (
                        <div key={index}>
                            <Image src={service.image} alt={service.alt} height={100} width={100} className="w-[250px] md:w-[210px] lg:w-full mx-auto" />

                            <div className="flex flex-col gap-3 lg:gap-5">
                                <h1 className="text-center md:text-[18px] lg:text-[20px] xl:text-[25px] mt-5 md:font-semibold font-cinzel">
                                    {service.title}
                                </h1>
                                <div className="flex items-center min-h-[125px] md:min-h-[145px] lg:min-h-[155px] xl:min-h-[160px] 2xl:min-h-[240px]">

                                <p className="text-center w-[250px] md:w-[210px] lg:w-[290px] xl:w-[370px] 2xl:w-[450px] mx-auto font-rakkas tracking-wide md:tracking-normal  my-auto">
                                    {service.description}
                                </p>
                                </div>
                                
                                <button 
                                    onClick={handleBookNow} 
                                    className="px-6 py-2 border-[#CCC193] border-[1px] mx-auto w-[250px] md:w-11/12 lg:w-3/6 text-[#FFFFFF] font-cinzel transition-all duration-300 ease-in-out hover:bg-[#CCC193] hover:text-black hover:border-black hover:scale-105 md:mt-3 "
                                >
                                    BOOK NOW
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
