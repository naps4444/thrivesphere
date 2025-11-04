"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { DateTime } from "luxon";

export default function AdminPage() {
  const [availableSlots, setAvailableSlots] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // 🇨🇦 Default admin timezone (Toronto)
  const ADMIN_TIMEZONE = "America/Toronto";

  // 🟢 Fetch availability and group by date
  useEffect(() => {
    async function fetchAvailability() {
      try {
        const response = await axios.get("/api/admin/availability");
        let fetchedSlots = response.data.availableSlots || [];

        // Deduplicate by startUTC
        fetchedSlots = Array.from(
          new Map(fetchedSlots.map((s) => [s.startUTC, s])).values()
        );

        // Group by local date (for display)
        const groupedByDate = fetchedSlots.reduce((acc, slot) => {
          if (!slot.startUTC || !slot.timeRange) return acc;
          const localDate = new Date(slot.startUTC)
            .toLocaleDateString("en-CA", { timeZone: ADMIN_TIMEZONE })
            .split("T")[0];
          if (!acc[localDate]) acc[localDate] = [];
          acc[localDate].push(slot);
          return acc;
        }, {});

        Object.keys(groupedByDate).forEach((date) => {
          groupedByDate[date].sort(
            (a, b) => new Date(a.startUTC) - new Date(b.startUTC)
          );
        });

        setAvailableSlots(groupedByDate);
      } catch (error) {
        console.error("Error fetching availability:", error);
        setMessage("Failed to load availability.");
      }
    }

    fetchAvailability();
  }, []);

  // 🟡 Add new slot (converted from Canada time → UTC)
  

const addSlot = () => {
  if (!selectedDate || !startTime || !endTime) {
    setMessage("Please select a date and time range.");
    return;
  }

  const newTimeRange = `${startTime} - ${endTime}`;

  // ✅ Convert from admin (Toronto) local → UTC properly (no double conversion)
  const startUTC = DateTime.fromISO(`${selectedDate}T${startTime}`, {
    zone: ADMIN_TIMEZONE,
  })
    .toUTC()
    .toISO();

  const endUTC = DateTime.fromISO(`${selectedDate}T${endTime}`, {
    zone: ADMIN_TIMEZONE,
  })
    .toUTC()
    .toISO();

  setAvailableSlots((prev) => {
    const updated = { ...prev };
    if (!updated[selectedDate]) updated[selectedDate] = [];

    const exists = updated[selectedDate].some(
      (s) => s.startUTC === startUTC && s.endUTC === endUTC
    );
    if (exists) {
      setMessage("This time slot already exists.");
      return prev;
    }

    updated[selectedDate].push({
      timeRange: newTimeRange,
      startUTC,
      endUTC,
      timeZone: ADMIN_TIMEZONE,
    });

    updated[selectedDate].sort(
      (a, b) => new Date(a.startUTC) - new Date(b.startUTC)
    );

    setMessage("");
    return updated;
  });

  setStartTime("");
  setEndTime("");
};


  // 🔴 Remove a slot
  const removeSlot = async (date, slot) => {
    try {
      await axios.delete("/api/admin/availability", {
        headers: { "Content-Type": "application/json" },
        data: { startUTC: slot.startUTC },
      });

      setAvailableSlots((prev) => {
        const updated = { ...prev };
        updated[date] = updated[date].filter((s) => s.startUTC !== slot.startUTC);
        if (updated[date].length === 0) delete updated[date];
        return updated;
      });

      setMessage("Slot removed successfully.");
    } catch (error) {
      console.error("Error removing slot:", error.response?.data || error.message);
      setMessage("Failed to remove slot.");
    }
  };

  // 🟣 Save all slots
  const saveAvailability = async () => {
    setLoading(true);
    try {
      const formattedSlots = Object.entries(availableSlots).flatMap(([date, slots]) =>
        slots.map((slot) => ({
          date,
          timeRange: slot.timeRange,
          startUTC: slot.startUTC,
          endUTC: slot.endUTC,
          timeZone: ADMIN_TIMEZONE, // Always Canada
        }))
      );

      const response = await axios.get("/api/admin/availability");
      const existingSlots = response.data.availableSlots || [];

      if (existingSlots.length > 0) {
        await axios.put("/api/admin/availability", { availableSlots: formattedSlots });
      } else {
        await axios.post("/api/admin/availability", { availableSlots: formattedSlots });
      }

      setMessage("Availability saved successfully!");
    } catch (error) {
      console.error("Error saving availability:", error.response?.data || error.message);
      setMessage("Failed to save availability.");
    }
    setLoading(false);
  };

  // 🧱 Render
  return (
    <div className="container md:w-8/12 xl:w-6/12 mx-auto flex flex-col justify-center px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-[#154E59]">
        Admin Dashboard
      </h1>

      {/* Inputs */}
      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <div className="flex flex-col">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            Select Date
          </label>
          <input
            id="date"
            type="date"
            className="border px-4 py-2 rounded"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="start-time" className="text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            id="start-time"
            type="time"
            className="border px-4 py-2 rounded"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="end-time" className="text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            id="end-time"
            type="time"
            className="border px-4 py-2 rounded"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <button
          className="bg-[#154E59] text-white px-4 py-2 rounded self-end transition-all duration-300 hover:bg-[#1b6773]"
          onClick={addSlot}
          disabled={!selectedDate || !startTime || !endTime}
        >
          Add Slot
        </button>
      </div>

      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}

      {/* Display Slots */}
      <ul className="mt-4 border p-4 rounded shadow">
        {Object.entries(availableSlots).length > 0 ? (
          Object.entries(availableSlots).map(([date, slots]) => (
            <li key={date} className="mt-2">
              <strong>{date}</strong>
              <ul>
                {slots.map((slot) => (
                  <li key={slot.startUTC} className="flex justify-between items-center">
                    {slot.timeRange} ({slot.timeZone || "America/Toronto"})
                    <button
                      onClick={() => removeSlot(date, slot)}
                      className="ml-4 text-red-500"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No slots added yet.</p>
        )}
      </ul>

      {/* Save */}
      <button
        className="bg-[#8b5e15] text-white px-6 py-2 mt-4 rounded border border-[#CCC193] hover:bg-[#a6751a]"
        onClick={saveAvailability}
        disabled={loading || Object.keys(availableSlots).length === 0}
      >
        {loading ? "Saving..." : "Save Availability"}
      </button>

      <Link href="/subscribers">
        <button className="px-6 py-2 mt-4 rounded-md border border-[#CCC193] w-full text-white bg-[#154E59] font-cinzel hover:bg-[#CCC193] hover:text-black">
          Go to Subscribers
        </button>
      </Link>

      <Link href="/admin/createBlogPage">
        <button className="px-6 py-2 mt-4 rounded-md border border-[#CCC193] w-full text-white bg-[#154E59] font-cinzel hover:bg-[#CCC193] hover:text-black">
          Post NewsLetter
        </button>
      </Link>
    </div>
  );
}
