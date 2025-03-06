import { updateAvailability } from "@/models/Availability";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { availableDates } = req.body;
    if (!Array.isArray(availableDates)) return res.status(400).json({ message: "Invalid request data" });

    await updateAvailability(availableDates);
    res.status(200).json({ message: "Availability updated successfully" });
  } catch (error) {
    console.error("Error updating availability:", error);
    res.status(500).json({ message: "Error updating availability" });
  }
}
