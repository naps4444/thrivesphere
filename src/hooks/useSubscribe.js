import { useState } from "react";

export const useSubscribe = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter an email!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Subscribed successfully!");
        setEmail("");
      } else {
        alert("Failed to subscribe. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, loading, handleSubscribe };
};
