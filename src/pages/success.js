"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BlinkBlur } from "react-loading-indicators";

// 🗓️ Helper: format date like "10th Feb 2025"
function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // e.g., "Feb"
  const year = date.getFullYear();

  // Add ordinal suffix (st, nd, rd, th)
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${month} ${year}`;
}

export default function SuccessPage() {
  const router = useRouter();
  const { session_id } = router.query;
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch session details
  useEffect(() => {
    if (!session_id) return;
    fetch(`/api/checkout-session?session_id=${session_id}`)
      .then((res) => res.json())
      .then((sessionData) => {
        setData(sessionData);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("Error fetching session data:", err);
        setIsLoaded(true);
      });
  }, [session_id]);

  // Loading spinner while waiting for data
  if (!isLoaded) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-[#154E59]">
        <BlinkBlur color="#fff" size="large" text="ThriveSphere" textColor="#fff" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-[#154E59] text-white text-xl font-rakkas">
        ⚠️ Unable to load your booking details. Please check your email for confirmation.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-8 font-rakkas">
      <div className="max-w-lg text-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
        <p className="text-lg mb-2">Thank you, {data.customer_name}!</p>

        <p className="text-gray-700">
          We’ve received your payment for:
          <br />
          <span className="font-semibold">{data.service}</span>
        </p>

        <div className="mt-4">
          <p className="text-gray-700">
            📅 <strong>Date:</strong> {formatDate(data.date)} <br />
            ⏰ <strong>Time:</strong> {data.time || "—"}
          </p>
        </div>

        <p className="mt-4 font-semibold">
          💳 Amount Paid: {data.amount_total} {data.currency?.toUpperCase()}
        </p>

        <p className="mt-6 text-gray-700">
          A confirmation email has been sent to{" "}
          <span className="font-semibold">{data.customer_email}</span>.
        </p>

        <p className="mt-4 text-gray-600">
          ThriveSphere will reach out soon to confirm your booking and share the next steps.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-2 bg-[#A8781C] text-white rounded-lg shadow hover:bg-[#916916] transition"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
