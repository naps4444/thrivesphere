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
      description:
        "A quick, judgment-free conversation to understand your needs and explore how coaching can unlock your potential. No commitment, just clarity.",
      price: "Free",
    },
    "deep-dive": {
      title: "DEEP DIVE - 1 HOUR | $100",
      description:
        "A focused, in-depth session designed to help you gain clarity, identify roadblocks, and take meaningful steps toward your goals.",
      price: "$100",
    },
    "momentum-package": {
      title: "MOMENTUM PACKAGE - 3 SESSIONS | $260",
      description:
        "Transformation doesn’t happen overnight. This package provides consistent support, actionable insights, and a clear path toward your goals.",
      price: "$260",
    },
  };

  const serviceData = serviceDetails[service] || {};
  const [availableSlots, setAvailableSlots] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const response = await axios.get("/api/admin/availability");
        const fetchedSlots = response.data.availableSlots || [];
  
        // Group slots by date while ensuring unique time slots
        const groupedByDate = fetchedSlots.reduce((acc, slot) => {
          const formattedDate = new Date(slot.date).toISOString().split("T")[0];
  
          if (!acc[formattedDate]) {
            acc[formattedDate] = new Set(); // Use Set to store unique time slots
          }
  
          acc[formattedDate].add(slot.timeRange); // Add time slot to the Set
  
          return acc;
        }, {});
  
        // Convert Sets back to arrays for rendering
        const processedSlots = Object.fromEntries(
          Object.entries(groupedByDate).map(([date, times]) => [date, [...times]])
        );
  
        setAvailableSlots(processedSlots);
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    }
    fetchAvailability();
  }, []);
  

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setAvailableTimes(availableSlots[formattedDate] || []);
    setSelectedTime("");
  }, [selectedDate, availableSlots]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  return (
    <div className="xl:container mx-auto px-6 py-12 text-[#154E59] ">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 hover:bg-gray-300 text-gray-700 rounded-lg flex items-center gap-2 font-rakkas"
      >
        <Image src="/backarr.svg" alt="icon" width={10} height={10} /> Back
      </button>

      <div className="flex flex-col md:flex-row items-start justify-center mt-6 gap-4">
        <div className="bg-white w-full md:w-6/12 lg:w-6/12 xl:w-7/12 mx-auto md:p-4 rounded-lg shadow-md">
          <h1 className="text-[30px] lg:text-[42px] font-bold text-center font-cinzel">
            {serviceData.title || "Service Not Found"}
          </h1>
          <p className="text-center mt-4 font-rakkas lg:text-xl xl:text-2xl 2xl:text-3xl">
            {serviceData.description}
          </p>

          <div className="border-b-[1px] border-black mt-6 mb-2">
            <p className="text-center mb-2 font-semibold tracking-wide">
              SELECT A DATE
            </p>
          </div>

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
                !Object.keys(availableSlots).includes(date.toISOString().split("T")[0])
              }
              className="custom-calendar mx-auto small-calendar"
              activeStartDate={currentMonth}
            />
          </div>

          {availableTimes.length > 0 && (
            <div className="mt-6">
              <div className="border-b-[1px] border-black mb-2">
                <p className="text-center mb-2 font-semibold tracking-wide">SELECT A TIME</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {availableTimes.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 border rounded ${
                      selectedTime === time ? "bg-[#154E59] text-white" : "bg-white text-black"
                    } hover:bg-[#1E6A75] hover:text-white transition-all`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedTime && (
            <p className="text-center mt-4 font-medium">
              You selected: {selectedDate.toDateString()} at {selectedTime}
            </p>
          )}
        </div>

        <div className="xl:w-7/12 md:my-auto">
          <BookingForm selectedDate={selectedDate} selectedTime={selectedTime} answers={answers} />
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
