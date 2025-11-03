// /components/Booking/QuestionData.js

export const questions = [
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
