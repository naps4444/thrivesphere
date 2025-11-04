"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { motion } from "framer-motion";
import BookingForm from "@/components/Booking/BookingForm";
import ScrollIndicator from "@/components/ScrollIndicator";

const ServicePage = () => {
  const router = useRouter();
  const { service } = router.query;

  const serviceDetails = {
    "lets-connect": {
      title: "LET’S CONNECT - 15 MINUTES, COMPLIMENTARY",
      description:
        "A quick, judgment-free conversation to understand your needs and explore how coaching can unlock your potential. No commitment, just clarity.",
      price: 0,
      slug: "lets-connect",
    },
    "deep-dive": {
      title: "DEEP DIVE - 1 HOUR | $100",
      description:
        "A focused, in-depth session designed to help you gain clarity, identify roadblocks, and take meaningful steps toward your goals.",
      price: 100,
      slug: "deep-dive",
    },
    "momentum-package": {
      title: "MOMENTUM PACKAGE - 3 SESSIONS | $260",
      description:
        "Transformation doesn’t happen overnight. This package provides consistent support, actionable insights, and a clear path toward your goals.",
      price: 260,
      slug: "momentum-package",
    },
  };

  const serviceData = serviceDetails[service] || {};
  const [availableSlots, setAvailableSlots] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  // 🕓 Fetch availability and group by Canadian date
  useEffect(() => {
    async function fetchAvailability() {
      try {
        const response = await axios.get("/api/availability/get");
        const slots = response.data.availableSlots || [];

        const grouped = slots.reduce((acc, slot) => {
          if (!slot.startUTC || !slot.endUTC) return acc;

          // Convert UTC → Toronto time for grouping by date
          const startCanada = new Date(
            new Date(slot.startUTC).toLocaleString("en-US", {
              timeZone: "America/Toronto",
            })
          );

          const dateKey = startCanada.toLocaleDateString("en-CA");
          if (!acc[dateKey]) acc[dateKey] = [];
          acc[dateKey].push({ ...slot, startCanada });
          return acc;
        }, {});

        setAvailableSlots(grouped);
      } catch (err) {
        console.error("Error fetching slots:", err);
      }
    }

    fetchAvailability();
  }, []);

  // 🔄 Update available times when user changes date or timezone
  useEffect(() => {
    const updateSlots = () => {
      const localKey = selectedDate.toLocaleDateString("en-CA");
      const slotsForDate = availableSlots[localKey] || [];

      const mapped = slotsForDate.map((slot) => {
        const startLocal = new Date(slot.startUTC);
        const endLocal = new Date(slot.endUTC);

        const localLabel = `${startLocal.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })} - ${endLocal.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}`;

        return { ...slot, startLocal, endLocal, localLabel };
      });

      setAvailableTimes(mapped);
      setSelectedTime(null);
    };

    updateSlots();

    // 🧩 Watch for timezone changes (VPN/system switch)
    let prevTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzInterval = setInterval(() => {
      const currentTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (currentTZ !== prevTZ) {
        prevTZ = currentTZ;
        updateSlots(); // refresh display when TZ changes
      }
    }, 2000);

    return () => clearInterval(tzInterval);
  }, [selectedDate, availableSlots]);

  const handlePrevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  const handleNextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );

  return (
    <div className="xl:container mx-auto px-6 py-12 text-[#154E59]">
      <ScrollIndicator />
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 hover:bg-gray-300 text-gray-700 rounded-lg flex items-center gap-2 font-rakkas"
      >
        Back
      </button>

      <div className="flex flex-col md:flex-row items-start justify-center mt-6 gap-6">
        {/* Left Side */}
        <div className="bg-white w-full md:w-6/12 xl:w-7/12 mx-auto p-4 rounded-lg shadow-md">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[30px] lg:text-[42px] font-bold text-center font-cinzel"
          >
            {serviceData.title || "Service Not Found"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 font-rakkas lg:text-xl xl:text-2xl"
          >
            {serviceData.description}
          </motion.p>

          {/* Calendar */}
          <div className="mt-6 xl:w-10/12 mx-auto 2xl:w-8/12">
            <div className="flex justify-between items-center mb-2">
              <button onClick={handlePrevMonth}>
                <IoIosArrowBack size={20} />
              </button>
              <span className="text-lg font-medium">
                {currentMonth.toLocaleString("default", { month: "long" })}{" "}
                {currentMonth.getFullYear()}
              </span>
              <button onClick={handleNextMonth}>
                <IoIosArrowForward size={20} />
              </button>
            </div>

            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileDisabled={({ date }) =>
                !availableSlots[date.toLocaleDateString("en-CA")]
              }
              activeStartDate={currentMonth}
              className="custom-calendar mx-auto small-calendar"
            />
          </div>

          {/* Time Slots */}
          {availableTimes.length > 0 && (
            <div className="mt-6">
              <p className="text-center mb-2 font-semibold tracking-wide">
                SELECT A TIME
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {availableTimes.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTime(slot)}
                    className={`px-4 py-2 border rounded ${
                      selectedTime?.startLocal?.getTime() ===
                      slot.startLocal.getTime()
                        ? "bg-[#154E59] text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {slot.localLabel}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedTime && (
            <p className="text-center mt-4 font-medium">
              You selected: {selectedDate.toDateString()} at{" "}
              {selectedTime.localLabel}
            </p>
          )}
        </div>

        {/* Booking Form */}
        <div className="xl:w-7/12 md:my-auto">
          <BookingForm
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedService={serviceData.slug || "lets-connect"}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
