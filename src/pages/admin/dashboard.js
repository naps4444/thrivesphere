import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function AdminPage() {
  const [availableSlots, setAvailableSlots] = useState({}); // Store slots as an object
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const response = await axios.get("/api/admin/availability");
        const fetchedSlots = response.data.availableSlots || [];

        // Group slots by date ensuring no duplicates
        const groupedByDate = fetchedSlots.reduce((acc, slot) => {
          const formattedDate = new Date(slot.date).toISOString().split("T")[0];

          if (!acc[formattedDate]) {
            acc[formattedDate] = [];
          }

          // Ensure only unique time ranges are stored
          if (!acc[formattedDate].includes(slot.timeRange)) {
            acc[formattedDate].push(slot.timeRange);
          }

          return acc;
        }, {});

        setAvailableSlots(groupedByDate); // Only fetch, don't modify slots
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    }
    fetchAvailability();
  }, []);

  const addSlot = () => {
    if (!selectedDate || !startTime || !endTime) {
      setMessage("Please select a date and time range.");
      return;
    }
  
    const formattedDate = new Date(selectedDate).toISOString().split("T")[0];
    const newTimeRange = `${startTime} - ${endTime}`;
  
    setAvailableSlots((prev) => {
      // Ensure prev is an object
      const updatedSlots = { ...prev };
  
      // If the date key doesn't exist, initialize with an empty array
      if (!updatedSlots[formattedDate]) {
        updatedSlots[formattedDate] = [];
      }
  
      // Check if the time range is already added
      if (updatedSlots[formattedDate].includes(newTimeRange)) {
        setMessage("This time slot is already added.");
        return prev;
      }
  
      // Append the new time slot
      updatedSlots[formattedDate] = [...updatedSlots[formattedDate], newTimeRange];
  
      setMessage(""); // Clear error message
      return updatedSlots;
    });
  
    setSelectedDate("");
    setStartTime("");
    setEndTime("");
  };
  

  const removeSlot = async (date, timeRange) => {
    try {
      console.log("Removing Slot:", { date, timeRange });

      await axios.delete("/api/admin/availability", {
        headers: { "Content-Type": "application/json" },
        data: { date: new Date(date).toISOString().split("T")[0], timeRange },
      });

      // Update state to remove slot from UI
      setAvailableSlots((prev) => {
        const updatedSlots = { ...prev };
        updatedSlots[date] = updatedSlots[date].filter((slot) => slot !== timeRange);

        if (updatedSlots[date].length === 0) {
          delete updatedSlots[date]; // Remove date if no slots left
        }

        return updatedSlots;
      });

      console.log("Slot removed successfully!");
    } catch (error) {
      console.error("Error removing slot:", error.response?.data || error.message);
    }
  };

  const saveAvailability = async () => {
    setLoading(true);
    try {
      // Convert availableSlots object to an array of { date, timeRange }
      const formattedSlots = Object.entries(availableSlots).flatMap(([date, times]) =>
        times.map((timeRange) => ({
          date,
          timeRange,
        }))
      );
  
      console.log("Saving Availability:", formattedSlots);
  
      await axios.post("/api/admin/availability", { availableSlots: formattedSlots });
  
      setMessage("Availability updated successfully!");
    } catch (error) {
      console.error("Error updating availability:", error.response?.data || error.message);
      setMessage("Failed to update availability.");
    }
    setLoading(false);
  };
  

  return (
    <div className="container md:w-8/12 xl:w-6/12 mx-auto flex flex-col justify-center px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-[#154E59]">Admin Dashboard</h1>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <input
          type="date"
          className="border px-4 py-2 rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <input
          type="time"
          className="border px-4 py-2 rounded"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="time"
          className="border px-4 py-2 rounded"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <button
          className="bg-[#154E59] text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={addSlot}
          disabled={!selectedDate || !startTime || !endTime}
        >
          Add Slot
        </button>
      </div>

      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}

      <ul className="mt-4 border p-4 rounded shadow">
        {Object.entries(availableSlots).length > 0 ? (
          Object.entries(availableSlots).map(([date, times]) => (
            <li key={date} className="mt-2">
              <strong>{date}</strong>
              <ul>
                {times.map((time, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {time}
                    <button
                      onClick={() => removeSlot(date, time)}
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

      <button
        className="bg-[#8b5e15] text-white px-6 py-2 mt-4 rounded"
        onClick={saveAvailability}
        disabled={loading || Object.keys(availableSlots).length === 0}
      >
        {loading ? "Saving..." : "Save Availability"}
      </button>
    </div>
  );
}
