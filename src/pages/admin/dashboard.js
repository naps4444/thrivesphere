import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

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
      console.log("Attempting to remove slot:", { date, timeRange });
  
      // Send delete request to API
      await axios.delete("/api/admin/availability", {
        headers: { "Content-Type": "application/json" },
        data: { date, timeRange },
      });
  
      // Update state to remove slot from UI
      setAvailableSlots((prev) => {
        const updatedSlots = { ...prev };
  
        if (updatedSlots[date]) {
          // Remove the specific time from the array
          updatedSlots[date] = updatedSlots[date].filter((time) => time !== timeRange);
  
          // If the date has no more slots, remove the date entry
          if (updatedSlots[date].length === 0) {
            delete updatedSlots[date];
          }
        }
  
        return updatedSlots; // Update state
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
  <div className="flex flex-col">
    <label htmlFor="date" className="text-sm font-medium text-gray-700">Select Date</label>
    <input
      id="date"
      type="date"
      className="border px-4 py-2 rounded"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="start-time" className="text-sm font-medium text-gray-700">Start Time</label>
    <input
      id="start-time"
      type="time"
      className="border px-4 py-2 rounded"
      value={startTime}
      onChange={(e) => setStartTime(e.target.value)}
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="end-time" className="text-sm font-medium text-gray-700">End Time</label>
    <input
      id="end-time"
      type="time"
      className="border px-4 py-2 rounded"
      value={endTime}
      onChange={(e) => setEndTime(e.target.value)}
    />
  </div>

  <button
  className="bg-[#154E59] text-white px-4 py-2 rounded disabled:opacity-50 self-end transition-all duration-300 ease-in-out hover:bg-[#1b6773]  hover:border-black hover:scale-105 disabled:cursor-not-allowed"
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
  className="bg-[#8b5e15] text-white px-6 py-2 mt-4 rounded border-[1px] border-[#CCC193] transition-all duration-300 ease-in-out hover:bg-[#a6751a] hover:text-black hover:border-black hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
  onClick={saveAvailability}
  disabled={loading || Object.keys(availableSlots).length === 0}
>
  {loading ? "Saving..." : "Save Availability"}
</button>



      <Link href="/subscribers">
            <button className="px-6 py-2 mt-4 rounded-md border-[#CCC193] border-[1px] mx-auto w-full text-[#FFFFFF] bg-[#154E59] font-cinzel transition-all duration-300 ease-in-out hover:bg-[#CCC193] hover:text-black hover:border-black hover:scale-105">
                Go to Subscribers
            </button>
        </Link>
    </div>
  );
}
