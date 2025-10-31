"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import useBookingStore from "@/store/bookingStore"; // 🧠 Zustand store

// 🧩 Questionnaire setup
const questions = [
  {
    id: "focus",
    text: "What would you like to focus on during our session?",
    type: "radio",
    options: [
      "I have a specific issue or goal in mind",
      "I’m unsure but would like to explore what’s on my mind",
      "I want general support and clarity on a situation",
    ],
  },
  {
    id: "goal_description",
    text: "If you have a specific issue or goal, please briefly describe it:",
    type: "text",
  },
  {
    id: "biggest_challenge",
    text: "What has been your biggest challenge related to this issue so far?",
    type: "text",
  },
  {
    id: "steps_taken",
    text: "Have you taken any steps toward resolving or improving this situation? If so, what has helped or not helped?",
    type: "text",
  },
  {
    id: "successful_outcome",
    text: "What would a successful outcome from our session look like for you?",
    type: "text",
  },
  {
    id: "background_info",
    text: "Is there any background information about yourself that you’d like to share to help me better understand your situation?",
    type: "text",
  },
  {
    id: "session_structure",
    text: "How would you like our session to be structured?",
    type: "checkbox",
    options: [
      "A guided conversation with thought-provoking questions",
      "Space for self-reflection and discovery",
      "Brainstorming solutions together",
      "A mix of the above",
    ],
  },
  {
    id: "extra_notes",
    text: "Is there anything else you’d like me to know before our session?",
    type: "text",
  },
  {
    id: "contact_preference",
    text: "How do you prefer to be contacted for scheduling and reminders?",
    type: "checkbox",
    options: ["Phone Text", "Email", "Other"],
  },
];

// 🧠 Questionnaire Carousel Component
const QuestionnaireCarousel = ({ answers, setAnswers, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowCompletionMessage(true);
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (id, option) => {
    setAnswers((prev) => {
      const selectedOptions = prev[id] || [];
      return {
        ...prev,
        [id]: selectedOptions.includes(option)
          ? selectedOptions.filter((item) => item !== option)
          : [...selectedOptions, option],
      };
    });
  };

  if (showCompletionMessage) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center bg-white p-4 rounded-lg shadow-md font-rakkas"
      >
        <h2 className="text-xl font-bold text-green-600">🎉 All Done!</h2>
        <p className="mt-2 text-gray-700">
          Great job! Now please fill out your contact info below to complete your booking.
        </p>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="w-full font-rakkas mx-auto p-2 bg-white rounded-lg shadow-md">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold mb-4"
      >
        {currentQuestion.text}
      </motion.h2>

      <div className="flex flex-col gap-2">
        {currentQuestion.type === "radio" &&
          currentQuestion.options?.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={option}
                checked={answers[currentQuestion.id] === option}
                onChange={() => handleAnswer(currentQuestion.id, option)}
                className="hidden"
              />
              <span
                className={`block py-2 px-4 border rounded-md text-center ${
                  answers[currentQuestion.id] === option
                    ? "bg-[#A8781C] text-white"
                    : "bg-gray-100"
                }`}
              >
                {option}
              </span>
            </label>
          ))}

        {currentQuestion.type === "checkbox" &&
          currentQuestion.options?.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="checkbox"
                checked={answers[currentQuestion.id]?.includes(option) || false}
                onChange={() => handleCheckboxChange(currentQuestion.id, option)}
                className="hidden"
              />
              <span
                className={`block py-2 px-4 border rounded-md text-center ${
                  answers[currentQuestion.id]?.includes(option)
                    ? "bg-[#A8781C] text-white"
                    : "bg-gray-100"
                }`}
              >
                {option}
              </span>
            </label>
          ))}

        {currentQuestion.type === "text" && (
          <textarea
            value={answers[currentQuestion.id] || ""}
            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Type your answer here..."
          />
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-md bg-gray-300"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-[#A8781C] text-white rounded-md"
        >
          {currentIndex === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

// 🧾 Booking Form Component
const BookingForm = ({ selectedDate, selectedTime, selectedService: initialService }) => {
  const router = useRouter();
  const setBookingDetails = useBookingStore((state) => state.setBookingDetails);

  const [answers, setAnswers] = useState({});
  const [showQuestionnaire, setShowQuestionnaire] = useState(null);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState(initialService || "lets-connect");

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

  const handleCheckout = async () => {
    try {
      // 🧠 Save booking details before redirect
      setBookingDetails({
        fullName,
        email,
        phone,
        selectedDate,
        selectedTime,
        selectedServiceSlug: selectedService,
        amount: price,
        questionnaire: answers,
      });

      // 🧾 Send to Stripe checkout API
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedServiceSlug: selectedService,
          fullName,
          email,
          selectedDate,
          selectedTime,
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

  const bookingData = {
    fullName,
    email,
    phone,
    selectedService: serviceName,
    selectedDate,
    selectedTime,
    questionnaire: answers,
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "431d794c-e212-4ced-8bd7-5340096e1403", // ✅ your Web3Forms key
        subject: "New Booking Submission",
        from_name: fullName,
        ...bookingData,
      }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success("✅ Booking submitted successfully!");

      if (price === 0) {
        toast.info("Thank you! Your complimentary session has been booked.");
      } else {
        await handleCheckout(); // proceed to Stripe
      }
    } else {
      console.error("Web3Forms error:", data);
      toast.error("⚠️ There was an issue submitting your booking. Please try again.");
    }
  } catch (error) {
    console.error("🔥 Network error while submitting booking:", error);
    toast.error("Network error — please check your connection and try again.");
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
          onComplete={() => setQuestionnaireCompleted(true)}
        />
      )}

      {showQuestionnaire !== null && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 bg-white p-4 rounded-lg shadow-md"
        >
          <input type="hidden" name="selected_service" value={serviceName} />

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />

          <button
            type="submit"
            disabled={!isFormValid}
            className={`bg-[#A8781C] text-white px-4 py-2 rounded w-full ${
              !isFormValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Confirm Booking
          </button>
        </motion.form>
      )}
    </div>
  );
};

export default BookingForm;
