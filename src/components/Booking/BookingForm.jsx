"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import useBookingStore from "@/store/bookingStore";
import QuestionnaireCarousel from "./QuestionnaireCarousel";

const BookingForm = ({ selectedDate, selectedTime, selectedService: initialService }) => {
  const router = useRouter();
  const setBookingDetails = useBookingStore((state) => state.setBookingDetails);

  const [answers, setAnswers] = useState({});
  const [showQuestionnaire, setShowQuestionnaire] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState(initialService || "lets-connect");
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Track button state

  useEffect(() => {
    if (router.query.service) {
      setSelectedService(decodeURIComponent(router.query.service));
    }
  }, [router.query.service]);

  const SERVICE_DATA = {
    "lets-connect": { name: "Let’s Connect - 15 Minutes, Complimentary", price: 0 },
    "deep-dive": { name: "Deep Dive - 1 Hour | $100", price: 100 },
    "momentum-package": { name: "Momentum Package - 3 Sessions | $260", price: 260 },
  };

  const serviceName = SERVICE_DATA[selectedService]?.name || selectedService;
  const price = SERVICE_DATA[selectedService]?.price ?? 0;

  const isFormValid = selectedDate && selectedTime && fullName && email && phone;

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getUTCDateTime = () => {
    if (!selectedDate || !selectedTime) return null;
    return selectedTime.utcStart?.toISOString() || null;
  };

  const handleCheckout = async () => {
    if (!isValidEmail(email)) {
      toast.error("⚠️ Please enter a valid email address.");
      return;
    }

    try {
      setBookingDetails({
        fullName,
        email,
        phone,
        selectedDate: getUTCDateTime(),
        selectedTime: getUTCDateTime(),
        selectedServiceSlug: selectedService,
        amount: price,
        questionnaire: answers,
      });

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedServiceSlug: selectedService,
          fullName,
          email,
          selectedDate: getUTCDateTime(),
          selectedTime: getUTCDateTime(),
        }),
      });

      const data = await res.json();
      if (data.url) {
        toast.info("Redirecting to Stripe Checkout...");
        window.location.href = data.url;
      } else {
        toast.error("Failed to create Stripe session.");
      }
    } catch (error) {
      console.error("🔥 Checkout Error:", error);
      toast.error("Something went wrong.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("⚠️ Please enter a valid email address.");
      return;
    }

    if (isSubmitting) return; // ✅ Prevent multiple submissions
    setIsSubmitting(true); // ✅ Disable button immediately
    try {
      const formattedAnswers = Object.entries(answers)
        .map(([question, answer]) => {
          if (Array.isArray(answer)) return `${question}: ${answer.join(", ")}`;
          return `${question}: ${answer}`;
        })
        .join("\n");

      const bookingData = {
        fullName,
        email,
        phone,
        selectedService: serviceName,
        selectedDate: getUTCDateTime(),
        selectedTime: getUTCDateTime(),
        questionnaire: formattedAnswers,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "431d794c-e212-4ced-8bd7-5340096e1403",
          subject: "New Booking Submission",
          from_name: fullName,
          ...bookingData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("✅ Booking submitted successfully!");
        if (price > 0) {
          await handleCheckout();
        }
      } else {
        console.error("Web3Forms error:", data);
        toast.error("⚠️ There was an issue submitting your booking. Please try again.");
        setIsSubmitting(false); // Re-enable button on failure
      }
    } catch (error) {
      console.error("🔥 Network error while submitting booking:", error);
      toast.error("Network error — please check your connection and try again.");
      setIsSubmitting(false); // Re-enable button on failure
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6 font-rakkas">
      {showQuestionnaire === null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-lg shadow-md text-center"
        >
          <h2 className="text-lg font-bold">Would you like to answer a few questions?</h2>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setShowQuestionnaire(true)}
              className="bg-[#A8781C] text-white px-4 py-2 rounded-md"
            >
              Yes
            </button>
            <button
              onClick={() => setShowQuestionnaire(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              No
            </button>
          </div>
        </motion.div>
      )}

      {showQuestionnaire && (
        <QuestionnaireCarousel
          answers={answers}
          setAnswers={setAnswers}
          onComplete={() => {}}
        />
      )}

      {showQuestionnaire !== null && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 bg-white p-4 rounded-lg shadow-md"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting} // ✅ Disable while submitting
            className={`bg-[#A8781C] text-white px-4 py-2 rounded w-full ${
              !isFormValid || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Confirm Booking"} {/* ✅ Change text */}
          </button>
        </motion.form>
      )}
    </div>
  );
};

export default BookingForm;
