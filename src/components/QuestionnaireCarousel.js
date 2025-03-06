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

const QuestionnaireCarousel = ({ answers, setAnswers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
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
              <span
                className={`py-2 px-4 border rounded-md w-full text-center ${
                  answers[currentQuestion.id] === option ? "bg-[#A8781C] text-white" : "bg-gray-100"
                }`}
              >
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
              <span
                className={`py-2 px-4 border rounded-md w-full text-center ${
                  (answers[currentQuestion.id] || []).includes(option) ? "bg-[#A8781C] text-white" : "bg-gray-100"
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

const BookingForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [answers, setAnswers] = useState({});

  return (
    <div className="max-w-lg mx-auto space-y-6 font-rakkas">
      {/* Questionnaire */}
      <QuestionnaireCarousel answers={answers} setAnswers={setAnswers} />

      {/* Booking Form */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full">
        <form
          action="https://formspree.io/f/mrbenyav"
          method="POST"
          className="mt-4 space-y-4"
        >
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 lg:text-lg">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full rounded-md"
              required
            />
          </div>

          {/* Phone Number Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 lg:text-lg">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 w-full rounded-md"
              required
            />
          </div>

          {/* Hidden Fields for Questionnaire Answers */}
          {Object.entries(answers).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={Array.isArray(value) ? value.join(", ") : value} />
          ))}

          {/* Submit Button */}
          <button
  type="submit"
  className="bg-[#A8781C] text-white px-4 py-2 rounded w-full transition duration-300 hover:bg-[#8c6416] hover:scale-105"
>
  Confirm Booking
</button>

        </form>
      </div>
    </div>
  );
};

export default BookingForm;
