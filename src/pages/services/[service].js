import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import Image from "next/image";
import BookingForm from "@/components/QuestionnaireCarousel";

const ServicePage = () => {
  const router = useRouter();
  const { service } = router.query;

  const serviceDetails = {
    "lets-connect": {
      title: "LET’S CONNECT - 30 MINUTES, COMPLIMENTARY",
      description: "A quick, judgment-free conversation to understand your needs and explore how coaching can unlock your potential. No commitment, just clarity.",
      price: "Free",
    },
    "deep-dive": {
      title: "DEEP DIVE - 1 HOUR | $100",
      description: "A focused, in-depth session designed to help you gain clarity, identify roadblocks, and take meaningful steps toward your goals.",
      price: "$100",
    },
    "momentum-package": {
      title: "MOMENTUM PACKAGE - 3 SESSIONS | $260",
      description: "Transformation doesn’t happen overnight. This package provides consistent support, actionable insights, and a clear path toward your goals.",
      price: "$260",
    },
  };

  const serviceData = serviceDetails[service] || {};
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const response = await axios.get("/api/admin/availability");
        setAvailableDates(response.data.availableDates.map(date => new Date(date)));
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    }
    fetchAvailability();
  }, []);

  // Reset selected date when the service changes
  useEffect(() => {
    setSelectedDate(new Date());
  }, [service]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  return (
    <div className="xl:container mx-auto px-6 py-12 text-[#154E59]">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 hover:bg-gray-300 text-gray-700 rounded-lg flex items-center gap-2 font-rakkas"
      >
        <Image src="/backarr.svg" alt="icon" width={10} height={10} /> Back
      </button>

    

      <div className="flex flex-col md:flex-row items-start justify-center mt-6 gap-4">
        <div className="bg-white w-full md:w-6/12 lg:w-6/12 xl:w-7/12 mx-auto md:p-4 rounded-lg shadow-md">
        <div>
        <h1 className="text-[30px] lg:text-[42px] font-bold text-center font-cinzel">{serviceData.title || "Service Not Found"}</h1>
        <p className="text-center mt-4 font-rakkas text-[18px]">{serviceData.description}</p>
        </div>
          <div className="border-b-[1px] border-black mt-6 mb-2">
            <p className="text-center mb-2 font-semibold tracking-wide" style={{ wordSpacing: "4px" }}>
              SELECT A DATE
            </p>
          </div>
         

          {/* Custom Calendar */}
          <div className="xl:w-10/12 mx-auto 2xl:w-8/12">
          <div className="flex justify-between items-center mb-2">
            <button onClick={handlePrevMonth} className="p-2 text-gray-600 hover:text-black">
              <IoIosArrowBack size={20} />
            </button>
            <span className="text-lg font-medium">
              {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
            </span>
            <button onClick={handleNextMonth} className="p-2 text-gray-600 hover:text-black">
              <IoIosArrowForward size={20} />
            </button>
          </div>

          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileDisabled={({ date }) =>
              !availableDates.some((availableDate) => availableDate.toDateString() === date.toDateString())
            }
            className="custom-calendar mx-auto small-calendar"
            activeStartDate={currentMonth}
          />

          </div>
         
        </div>

        <div className="xl:w-7/12 md:my-auto">
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
