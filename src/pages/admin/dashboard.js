import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPage() {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const response = await axios.get("/api/admin/availability");
        setAvailableDates(response.data.availableDates || []);
      } catch (error) {
        console.error("Error fetching availability:", error);
        setMessage("Failed to load availability.");
      }
    }
    fetchAvailability();
  }, []);

  const addDate = () => {
    if (!selectedDate) {
      setMessage("Please select a date.");
      return;
    }

    const formattedDate = new Date(selectedDate).toISOString().split("T")[0]; // "YYYY-MM-DD" format

    if (availableDates.includes(formattedDate)) {
      setMessage("This date is already added.");
      return;
    }

    setAvailableDates((prev) => [...prev, formattedDate]);
    setSelectedDate(""); // Reset input
    setMessage(""); // Clear error message
  };

  const removeDate = async (dateToRemove) => {
    try {
      await axios.delete("/api/admin/availability", { data: { date: dateToRemove } });
      setAvailableDates((prev) => prev.filter((date) => date !== dateToRemove));
      setMessage("");
    } catch (error) {
      console.error("Error removing date:", error);
      setMessage("Failed to remove date.");
    }
  };

  const saveAvailability = async () => {
    setLoading(true);
    try {
      await axios.post("/api/admin/availability", { availableDates });
      setMessage("Availability updated successfully! ✅");
    } catch (error) {
      console.error("Error updating availability:", error);
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
        <button
          className="bg-[#154E59] text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={addDate}
          disabled={!selectedDate}
        >
          Add Date
        </button>
      </div>

      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}

      <ul className="mt-4 border p-4 rounded shadow">
  {availableDates.length > 0 ? (
    availableDates.map((date, index) => {
      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return (
        <li key={index} className="flex justify-between items-center py-1 text-gray-700">
          <span>
            {date} ({formattedDate})
          </span>
          <button className="ml-4 text-red-500" onClick={() => removeDate(date)}>
            ❌ Remove
          </button>
        </li>
      );
    })
  ) : (
    <p className="text-gray-500">No dates added yet.</p>
  )}
</ul>


      <button
        className="bg-[#8b5e15] text-white px-6 py-2 mt-4 rounded disabled:opacity-50"
        onClick={saveAvailability}
        disabled={loading || availableDates.length === 0}
      >
        {loading ? "Saving..." : "Save Availability"}
      </button>
    </div>
  );
}
