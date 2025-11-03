// /components/Booking/QuestionnaireCarousel.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { questions } from "./QuestionData";

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

export default QuestionnaireCarousel;
