import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useEffect, useState, useRef } from "react";

const Numbers = () => {
    const stats = [
        { number: 100, text: "Coaching Clients" },
        { number: 100, text: "Students Taught" },
        { number: 10, text: "Years of Experience" },
        { number: 100, text: "Clients Satisfaction", isPercentage: true },
    ];

    const [counts, setCounts] = useState(stats.map(() => 0));
    const [hasStarted, setHasStarted] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.3 } // Start counting when 30% of the section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        const intervals = stats.map((stat, index) => {
            let count = 0;
            const step = Math.ceil(stat.number / 100); // Slower counting effect
            const interval = setInterval(() => {
                count += step;
                if (count >= stat.number) {
                    count = stat.number;
                    clearInterval(interval);
                }
                setCounts((prev) => {
                    const newCounts = [...prev];
                    newCounts[index] = count;
                    return newCounts;
                });
            }, 50); // Adjust speed for smooth counting
            return interval;
        });

        return () => intervals.forEach(clearInterval);
    }, [hasStarted]);

    return (
        <div ref={sectionRef} className="bg-black py-6 pb-10 lg:py-14 lg:pb-24 xl:container mx-auto">
            {/* Mobile View - Swiper Carousel */}
            <div className="block md:hidden">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    loop={true}
                >
                    {stats.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="text-white text-center p-6">
                                <h1 className="text-[50px] font-semibold font-cinzel">
                                    {item.number}
                                    {item.isPercentage ? "%" : "+"}
                                </h1>
                                <p className="font-georgia">{item.text}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Tablet to Large Screens - Flex Row */}
            <div className="hidden md:flex justify-between xl:container mx-auto px-3 text-white">
                {stats.map((item, index) => (
                    <div key={index} className={`flex justify-center w-full ${index !== stats.length - 1 ? 'border-r-[1px] border-white' : ''}`}>
                        <div className="text-center">
                            <h1 className="text-[30px] lg:text-[50px] font-semibold font-cinzel">
                                {counts[index]}
                                {item.isPercentage ? "%" : "+"}
                            </h1>
                            <p className="font-georgia">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Numbers;
