import { useState } from "react";

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

const QuestionnaireCarousel = ({ answers, setAnswers, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowCompletionMessage(true);
      onComplete(); // Notify parent component that the questionnaire is done
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
      <div className="text-center bg-white p-4 rounded-lg shadow-md font-rakkas">
        <h2 className="text-xl font-bold text-green-600">🎉 Congratulations!</h2>
        <p className="mt-2 text-gray-700">
          You've successfully answered the questionnaire. You can now fill in your full name, email address, and phone number to submit.
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="w-full font-rakkas mx-auto p-2 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{currentQuestion.text}</h2>

      <div className="flex flex-col gap-2">
        {currentQuestion.type === "radio" &&
          currentQuestion.options.map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={option}
                checked={answers[currentQuestion.id] === option}
                onChange={() => handleAnswer(currentQuestion.id, option)}
                className="hidden"
              />
              <span className={`py-2 px-4 border rounded-md w-full text-center ${
                answers[currentQuestion.id] === option ? "bg-[#A8781C] text-white" : "bg-gray-100"
              }`}>
                {option}
              </span>
            </label>
          ))}

        {currentQuestion.type === "checkbox" &&
          currentQuestion.options.map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(answers[currentQuestion.id] || []).includes(option)}
                onChange={() => handleCheckboxChange(currentQuestion.id, option)}
                className="hidden"
              />
              <span className={`py-2 px-4 border rounded-md w-full text-center ${
                (answers[currentQuestion.id] || []).includes(option) ? "bg-[#A8781C] text-white" : "bg-gray-100"
              }`}>
                {option}
              </span>
            </label>
          ))}

        {currentQuestion.type === "text" && (
          <textarea
            value={answers[currentQuestion.id] || ""}
            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Type your answer here (optional)..."
          />
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-md ${currentIndex === 0 ? "bg-gray-300" : "bg-[#A8781C] text-white"} transition duration-300 hover:bg-[#8c6416] hover:scale-105 hover:text-white`}
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-[#A8781C] text-white rounded-md transition duration-300 hover:bg-[#8c6416] hover:scale-105"
        >
          {currentIndex === questions.length - 1 ? "Done" : "Next"}
        </button>
      </div>
    </div>
  );
};


const BookingForm = ({ selectedDate, selectedTime }) => {
  const [answers, setAnswers] = useState({});
  const [showQuestionnaire, setShowQuestionnaire] = useState(null);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);

  return (
    <div className="max-w-lg mx-auto space-y-6 font-rakkas lg:text-xl 2xl:text-2xl">
      {showQuestionnaire === null && (
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-bold">
            Would you like to answer a few questions before booking?
          </h2>
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => setShowQuestionnaire(true)} className="bg-[#A8781C] text-white px-4 py-2 rounded-md">
              Yes
            </button>
            <button onClick={() => setShowQuestionnaire(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
              No
            </button>
          </div>
        </div>
      )}

      {showQuestionnaire && (
        <QuestionnaireCarousel
          answers={answers}
          setAnswers={setAnswers}
          onComplete={() => setQuestionnaireCompleted(true)}
        />
      )}

      {showQuestionnaire !== null && (
        <div className="bg-white p-4 rounded-lg shadow-md w-full">
          <form action="https://formspree.io/f/mrbenyav" method="POST" className="space-y-4">
            <input type="text" name="full_name" required className="w-full p-2 border rounded-md" placeholder="Full Name" />
            <input type="email" name="email" required className="w-full p-2 border rounded-md" placeholder="Email" />
            <input type="tel" name="phone" required className="w-full p-2 border rounded-md" placeholder="Phone Number" />

            <button type="submit" className="bg-[#A8781C] text-white px-4 py-2 rounded w-full">
              Confirm Booking
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
