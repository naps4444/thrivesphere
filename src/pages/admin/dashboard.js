import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function AdminPage() {
  const [availableSlots, setAvailableSlots] = useState([]);
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

        console.log("Fetched Data:", response.data);

        // Convert Firestore timestamps to strings
        const formattedSlots = response.data.availableSlots.map((slot) => ({
          ...slot,
          date: slot.date?._seconds
            ? new Date(slot.date._seconds * 1000).toISOString().split("T")[0]
            : slot.date,
          createdAt: slot.createdAt?._seconds
            ? new Date(slot.createdAt._seconds * 1000).toISOString()
            : "N/A",
        }));

        console.log("Formatted Slots:", formattedSlots);
        setAvailableSlots(formattedSlots);
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

    const newSlot = {
      date: formattedDate,
      timeRange: `${startTime} - ${endTime}`,
      createdAt: new Date().toISOString(),
    };

    const alreadyExists = availableSlots.some(
      (slot) => slot.date === newSlot.date && slot.timeRange === newSlot.timeRange
    );

    if (alreadyExists) {
      setMessage("This time slot is already added.");
      return;
    }

    console.log("Adding Slot:", newSlot);
    setAvailableSlots((prev) => [...prev, newSlot]);
    setSelectedDate("");
    setStartTime("");
    setEndTime("");
    setMessage("");
  };

  const removeSlot = async (date, timeRange) => {
    try {
      console.log("Removing Slot:", { date, timeRange });

      await axios.delete("/api/admin/availability", {
        headers: { "Content-Type": "application/json" },
        data: { date: new Date(date).toISOString().split("T")[0], timeRange },
      });
      

      // Update state to remove slot from UI
      setAvailableSlots((prev) => prev.filter(slot => !(slot.date === date && slot.timeRange === timeRange)));

      console.log("Slot removed successfully!");
    } catch (error) {
      console.error("Error removing slot:", error.response?.data || error.message);
    }
  };

  const saveAvailability = async () => {
    setLoading(true);
    try {
      console.log("Saving Availability:", availableSlots);
      await axios.post("/api/admin/availability", { availableSlots });
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
        {availableSlots.length > 0 ? (
          availableSlots.map((slot, index) => (
            <li key={index}>
              {slot.date} ({slot.timeRange}) - {slot.createdAt}

              <button onClick={() => removeSlot(slot.date, slot.timeRange)} className="ml-4 text-red-500">
                Remove
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No slots added yet.</p>
        )}
      </ul>

      <button className="bg-[#8b5e15] text-white px-6 py-2 mt-4 rounded" onClick={saveAvailability} disabled={loading || availableSlots.length === 0}>
        {loading ? "Saving..." : "Save Availability"}
      </button>
    </div>
  );
}
